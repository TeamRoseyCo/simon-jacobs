"use client";

import { useEffect, useState } from "react";

type SavedField = {
  id: string;
  html: string;
  text: string;
  updatedAt: string;
};

const dbName = "srj-copy-homepage";
const storeName = "fields";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(storeName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function store(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(storeName, mode).objectStore(storeName);
}

function getAll(db: IDBDatabase): Promise<SavedField[]> {
  return new Promise((resolve) => {
    const request = store(db, "readonly").getAll();
    request.onsuccess = () => resolve((request.result || []) as SavedField[]);
    request.onerror = () => resolve([]);
  });
}

function getOne(db: IDBDatabase, id: string): Promise<SavedField | null> {
  return new Promise((resolve) => {
    const request = store(db, "readonly").get(id);
    request.onsuccess = () => resolve((request.result as SavedField) || null);
    request.onerror = () => resolve(null);
  });
}

function putOne(db: IDBDatabase, field: SavedField) {
  store(db, "readwrite").put(field);
}

function clearAll(db: IDBDatabase): Promise<void> {
  return new Promise((resolve) => {
    const request = store(db, "readwrite").clear();
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
  });
}

function downloadJson(rows: SavedField[]) {
  const data = Object.fromEntries(
    rows.map((row) => [row.id, { text: row.text, html: row.html }]),
  );
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "srj-homepage-copy-draft.json";
  a.click();
  URL.revokeObjectURL(url);
}

export default function EditableCopyMode() {
  const [status, setStatus] = useState("Loading editor...");

  useEffect(() => {
    let db: IDBDatabase | null = null;
    let saveTimer: number | undefined;
    const listeners: Array<() => void> = [];

    async function init() {
      db = await openDb();
      const root = document.querySelector(".copy-homepage-root");
      if (!root) return;

      const editableNodes = Array.from(
        root.querySelectorAll<HTMLElement>(
          "h1, h2, h3, p, li, a, figcaption span, blockquote p",
        ),
      ).filter((node) => {
        if (node.closest(".copy-editor-toolbar")) return false;
        if (node.closest("script, style, form")) return false;
        if (!node.textContent?.trim()) return false;
        return true;
      });

      for (const [index, node] of editableNodes.entries()) {
        const id =
          node.dataset.copyKey ||
          `${node.tagName.toLowerCase()}-${index}-${node.textContent
            ?.trim()
            .slice(0, 28)
            .replace(/\s+/g, "-")
            .toLowerCase()}`;
        node.dataset.copyKey = id;
        node.contentEditable = "true";
        node.spellcheck = true;
        node.classList.add("copy-editable");

        const saved = await getOne(db, id);
        if (saved?.html) node.innerHTML = saved.html;

        const onInput = () => {
          if (!db) return;
          setStatus("Saving...");
          window.clearTimeout(saveTimer);
          saveTimer = window.setTimeout(() => {
            if (!db) return;
            putOne(db, {
              id,
              html: node.innerHTML,
              text: node.innerText,
              updatedAt: new Date().toISOString(),
            });
            setStatus("Saved locally");
          }, 200);
        };

        const stopClick = (event: MouseEvent) => {
          event.preventDefault();
        };

        node.addEventListener("input", onInput);
        node.addEventListener("click", stopClick);
        listeners.push(() => {
          node.removeEventListener("input", onInput);
          node.removeEventListener("click", stopClick);
        });
      }

      setStatus(`${editableNodes.length} editable text blocks`);
    }

    init().catch(() => setStatus("Editor unavailable"));

    return () => {
      window.clearTimeout(saveTimer);
      listeners.forEach((remove) => remove());
      db?.close();
    };
  }, []);

  async function exportDraft() {
    const db = await openDb();
    const rows = await getAll(db);
    downloadJson(rows);
    db.close();
  }

  async function clearDraft() {
    const db = await openDb();
    await clearAll(db);
    db.close();
    window.location.reload();
  }

  return (
    <div className="copy-editor-toolbar" aria-label="Copy editor controls">
      <span>{status}</span>
      <button type="button" onClick={exportDraft}>
        Export JSON
      </button>
      <button type="button" onClick={clearDraft}>
        Clear draft
      </button>
      <style jsx global>{`
        .copy-editor-toolbar {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(16, 32, 51, 0.16);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 14px 44px rgba(16, 32, 51, 0.16);
          padding: 8px 10px 8px 14px;
          color: #102033;
          font: 600 13px/1.2 var(--font-sans);
          backdrop-filter: blur(14px);
        }

        .copy-editor-toolbar button {
          min-height: 32px;
          border: 1px solid rgba(16, 32, 51, 0.16);
          border-radius: 999px;
          background: #fff;
          color: #102033;
          cursor: pointer;
          font: inherit;
          padding: 0 10px;
        }

        .copy-editable {
          outline: 1px dashed rgba(24, 143, 135, 0.42);
          outline-offset: 5px;
          cursor: text;
        }

        .copy-editable:focus {
          outline: 2px solid rgba(24, 143, 135, 0.82);
          box-shadow: 0 0 0 7px rgba(24, 143, 135, 0.12);
        }
      `}</style>
    </div>
  );
}
