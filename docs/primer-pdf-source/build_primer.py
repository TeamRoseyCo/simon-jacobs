#!/usr/bin/env python3
"""Render the SRJ industry-primer Markdown as a print-ready HTML book."""

from pathlib import Path
import html
import re
import sys


SRC = Path(sys.argv[1]).resolve()
DST = Path(sys.argv[2]).resolve()
HOME_SHOT = (SRC.parent.parent / "shot.png").resolve().as_uri()
SOURCE_TEXT = SRC.read_text(encoding="utf-8")
FOOTNOTE_ORDER = []
for footnote_id in re.findall(r"(?m)^\[\^([A-Za-z0-9_-]+)\]:", SOURCE_TEXT):
    if footnote_id not in FOOTNOTE_ORDER:
        FOOTNOTE_ORDER.append(footnote_id)
FOOTNOTE_NUM = {footnote_id: index + 1 for index, footnote_id in enumerate(FOOTNOTE_ORDER)}


CSS = r"""
@page { size: A4; margin: 20mm 20mm 22mm 20mm; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  font-family: "Times New Roman", Times, serif;
  font-size: 12pt; line-height: 1.34; color: #000; background: #fff; margin: 0;
  orphans: 3; widows: 3;
}
p { margin: 0 0 7pt 0; orphans: 3; widows: 3; }
h1.title { font-size: 27pt; line-height: 1.12; margin: 0 0 8pt; }
h1.part {
  font-size: 11pt; letter-spacing: 0.17em; font-weight: bold;
  margin: 0 0 2pt; padding-bottom: 4pt; border-bottom: 1.2pt solid #000;
  page-break-before: always; page-break-after: avoid; break-after: avoid;
}
h1.part + h1.chap { page-break-before: avoid; margin-top: 14pt; }
h1.chap {
  font-size: 16pt; line-height: 1.18; margin: 0 0 10pt;
  page-break-before: always; page-break-after: avoid; break-after: avoid;
}
h2 { font-size: 12pt; font-weight: bold; margin: 12pt 0 4pt;
     page-break-after: avoid; break-after: avoid; }
h3 { font-size: 12pt; font-weight: bold; font-style: italic; margin: 11pt 0 3pt;
     page-break-after: avoid; break-after: avoid; }
ul, ol { margin: 0 0 7pt; padding-left: 18pt; }
li { margin: 0 0 2.5pt; }
blockquote { margin: 8pt 0 10pt; padding: 2pt 0 2pt 12pt; border-left: 2pt solid #000; }
blockquote p { margin: 0; }
table { border-collapse: collapse; width: 100%; margin: 5pt 0 10pt; }
th, td { border: 0.5pt solid #000; padding: 4pt 5.5pt; text-align: left;
         vertical-align: top; font-size: 9.7pt; line-height: 1.27; }
th { font-weight: bold; background: #f0f0f0; }
tr { page-break-inside: avoid; break-inside: avoid; }
strong { font-weight: bold; }
em { font-style: italic; }
a { color: #000; text-decoration: none; }
.sources a { text-decoration: underline; text-decoration-thickness: 0.45pt; }
.source { font-size: 9.5pt; line-height: 1.3; margin-bottom: 6pt; }
sup.fn { font-size: 8pt; vertical-align: super; line-height: 0; }
.titlepage { page-break-after: always; padding-top: 43mm; }
.titlepage .sub { font-size: 14pt; font-style: italic; line-height: 1.3; max-width: 145mm; }
.titlepage .meta { font-size: 11pt; margin-top: 28pt; }
.front { page-break-after: always; }
.front h1 { font-size: 16pt; margin: 0 0 9pt; }
.toc { font-size: 10.8pt; line-height: 1.28; page-break-after: always; }
.toc .part { font-weight: bold; letter-spacing: 0.06em; margin: 10pt 0 3pt; }
.toc .item { margin: 0 0 1.8pt; }
.toc .n { display: inline-block; width: 22pt; }
.fig { margin: 10pt 0 12pt; page-break-inside: avoid; break-inside: avoid; }
.fig svg { display: block; width: 100%; height: auto; }
.fig.compact { margin: 4pt 0 7pt; }
.fig.compact svg { max-height: 39mm; }
.fig img { display: block; max-width: 100%; max-height: 154mm; width: auto; margin: 0 auto;
           border: 0.5pt solid #888; }
figcaption { font-size: 9.6pt; line-height: 1.28; margin-top: 5pt; }
.smallcaps { font-size: 9.5pt; letter-spacing: 0.11em; font-weight: bold; }
.keep { page-break-inside: avoid; break-inside: avoid; }
"""


PARTS = {
    1: "PART ONE - THE TRADE AND THE MARKET",
    4: "PART TWO - THE OWNER AND THE MONEY",
    8: "PART THREE - THE SPECIFIC SPIKES AND THE VOICES",
    11: "PART FOUR - HOW THE BUYER CHOOSES",
    15: "PART FIVE - THE POSITION AND THE HOMEPAGE",
    18: "PART SIX - DECISIONS, LIMITS AND SOURCES",
}


def fig(caption, svg, cls=""):
    return f'<figure class="fig {cls}">{svg}<figcaption>{caption}</figcaption></figure>'


THREE_LAYERS = fig(
    "Figure 1. The same practice sells three different outcomes. Compliance is the base; the commercial distinction sits above it.",
    r"""<svg viewBox="0 0 680 230" role="img" aria-label="Three layers of accountancy">
    <rect x="8" y="18" width="210" height="185" fill="#fff" stroke="#000"/>
    <rect x="235" y="18" width="210" height="185" fill="#f1f1f1" stroke="#000"/>
    <rect x="462" y="18" width="210" height="185" fill="#d8d8d8" stroke="#000"/>
    <g font-family="Times New Roman" fill="#000">
      <text x="24" y="47" font-size="16" font-weight="bold">COMPLIANCE</text>
      <text x="251" y="47" font-size="16" font-weight="bold">CONTROL</text>
      <text x="478" y="47" font-size="16" font-weight="bold">DECISIONS</text>
      <g font-size="13">
        <text x="24" y="78">Accounts and returns</text><text x="24" y="101">VAT, payroll, MTD</text>
        <text x="24" y="124">Correct records</text><text x="24" y="170" font-style="italic">What happened?</text>
        <text x="251" y="78">Current numbers</text><text x="251" y="101">Cash and tax reserves</text>
        <text x="251" y="124">Forecasts and margins</text><text x="251" y="170" font-style="italic">Where are we?</text>
        <text x="478" y="78">Extraction and timing</text><text x="478" y="101">Residence and structure</text>
        <text x="478" y="124">Investment and exit</text><text x="478" y="170" font-style="italic">What should happen next?</text>
      </g>
    </g></svg>""",
    "compact",
)

MARKET_FUNNEL = fig(
    "Figure 2. Headline market size is not the addressable market. Need, complexity and willingness to engage do the qualifying.",
    r"""<svg viewBox="0 0 680 260" role="img" aria-label="SRJ market funnel">
    <g font-family="Times New Roman" fill="#000" text-anchor="middle">
      <path d="M45 24 H635 L580 78 H100 Z" fill="#f0f0f0" stroke="#000"/>
      <path d="M100 88 H580 L525 142 H155 Z" fill="#e4e4e4" stroke="#000"/>
      <path d="M155 152 H525 L470 206 H210 Z" fill="#d7d7d7" stroke="#000"/>
      <path d="M210 216 H470 L440 248 H240 Z" fill="#000" stroke="#000"/>
      <text x="340" y="48" font-size="17" font-weight="bold">5.69m UK private-sector businesses</text>
      <text x="340" y="68" font-size="12">A population figure, not SRJ's market</text>
      <text x="340" y="112" font-size="15" font-weight="bold">Owner-managed and personally exposed</text>
      <text x="340" y="132" font-size="12">Company and owner decisions interact</text>
      <text x="340" y="176" font-size="15" font-weight="bold">A live decision or material complexity</text>
      <text x="340" y="196" font-size="12">Extraction, cross-border, control or exit</text>
      <text x="340" y="238" font-size="14" font-weight="bold" fill="#fff">SRJ FIT</text>
    </g></svg>""",
)

DECISION_CALENDAR = fig(
    "Figure 3. A service calendar is the concrete version of 'proactive'. Event-led reviews sit on top of the agreed recurring rhythm.",
    r"""<svg viewBox="0 0 680 235" role="img" aria-label="Accountancy decision calendar">
    <g font-family="Times New Roman" fill="#000">
      <line x1="55" y1="118" x2="625" y2="118" stroke="#000" stroke-width="1.2"/>
      <g text-anchor="middle" font-size="12">
        <line x1="70" y1="106" x2="70" y2="130" stroke="#000"/><text x="70" y="151">ONBOARD</text>
        <line x1="210" y1="106" x2="210" y2="130" stroke="#000"/><text x="210" y="151">REVIEW</text>
        <line x1="350" y1="100" x2="350" y2="136" stroke="#000"/><text x="350" y="151">PRE-YEAR-END</text>
        <line x1="490" y1="106" x2="490" y2="130" stroke="#000"/><text x="490" y="151">REVIEW</text>
        <line x1="610" y1="100" x2="610" y2="136" stroke="#000"/><text x="610" y="151">FILE</text>
      </g>
      <rect x="112" y="28" width="455" height="50" fill="#eee" stroke="#000"/>
      <text x="340" y="49" text-anchor="middle" font-size="14" font-weight="bold">EVENT-LED REVIEW BEFORE ACTION</text>
      <text x="340" y="68" text-anchor="middle" font-size="12">dividend | pension | move | investment | sale</text>
      <text x="340" y="195" text-anchor="middle" font-size="13" font-style="italic">Current records make each review usable.</text>
    </g></svg>""",
)

OWNER_SYSTEM = fig(
    "Figure 4. The owner experiences one money system even though the company and shareholder are legally separate.",
    r"""<svg viewBox="0 0 680 270" role="img" aria-label="Owner managed business money system">
    <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#000"/></marker></defs>
    <g font-family="Times New Roman" fill="#000">
      <rect x="18" y="86" width="118" height="72" fill="#fff" stroke="#000"/><text x="77" y="116" text-anchor="middle" font-size="14" font-weight="bold">REVENUE</text><text x="77" y="138" text-anchor="middle" font-size="12">cash collected</text>
      <rect x="178" y="50" width="184" height="144" fill="#eee" stroke="#000"/><text x="270" y="80" text-anchor="middle" font-size="15" font-weight="bold">THE COMPANY</text><text x="195" y="107" font-size="12">VAT and payroll</text><text x="195" y="130" font-size="12">suppliers and overhead</text><text x="195" y="153" font-size="12">corporation tax reserve</text><text x="195" y="176" font-size="12">working capital</text>
      <rect x="405" y="34" width="252" height="176" fill="#d9d9d9" stroke="#000"/><text x="531" y="64" text-anchor="middle" font-size="15" font-weight="bold">THE OWNER'S CHOICES</text><text x="425" y="94" font-size="12">salary or bonus</text><text x="425" y="117" font-size="12">dividends</text><text x="425" y="140" font-size="12">employer pension</text><text x="425" y="163" font-size="12">retain and invest</text><text x="425" y="186" font-size="12">prepare for exit</text>
      <line x1="136" y1="122" x2="174" y2="122" stroke="#000" marker-end="url(#arr)"/>
      <line x1="362" y1="122" x2="401" y2="122" stroke="#000" marker-end="url(#arr)"/>
      <text x="340" y="244" text-anchor="middle" font-size="13" font-style="italic">Bank cash is not the same as money available to extract.</text>
    </g></svg>""",
)

CROSS_BORDER = fig(
    "Figure 5. The useful UK/UAE offer is coordinated analysis. SRJ owns the UK answer; local advisers confirm the foreign answer.",
    r"""<svg viewBox="0 0 680 285" role="img" aria-label="UK UAE advice coordination map">
    <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#000"/></marker></defs>
    <g font-family="Times New Roman" fill="#000">
      <rect x="18" y="58" width="190" height="154" fill="#eee" stroke="#000"/><text x="113" y="87" text-anchor="middle" font-size="16" font-weight="bold">UNITED KINGDOM</text><text x="38" y="117" font-size="12">residence and split year</text><text x="38" y="140" font-size="12">UK company management</text><text x="38" y="163" font-size="12">salary and dividends</text><text x="38" y="186" font-size="12">property and return rules</text>
      <rect x="257" y="82" width="166" height="106" fill="#000" stroke="#000"/><text x="340" y="116" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">OWNER'S</text><text x="340" y="139" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">DECISION</text><text x="340" y="165" text-anchor="middle" font-size="12" fill="#fff">before money moves</text>
      <rect x="472" y="58" width="190" height="154" fill="#fff" stroke="#000"/><text x="567" y="87" text-anchor="middle" font-size="16" font-weight="bold">UAE / LOCAL</text><text x="492" y="117" font-size="12">entity and licensing</text><text x="492" y="140" font-size="12">local tax treatment</text><text x="492" y="163" font-size="12">immigration and regulation</text><text x="492" y="186" font-size="12">local implementation</text>
      <line x1="208" y1="135" x2="253" y2="135" stroke="#000" marker-end="url(#a2)"/><line x1="423" y1="135" x2="468" y2="135" stroke="#000" marker-end="url(#a2)"/>
      <text x="340" y="252" text-anchor="middle" font-size="13" font-style="italic">Conflicting advice must be resolved before implementation.</text>
    </g></svg>""",
)

SWITCHING = fig(
    "Figure 6. The public threads describe a sequence, not a vague desire for better service.",
    r"""<svg viewBox="0 0 680 250" role="img" aria-label="Accountant switching sequence">
    <defs><marker id="a3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#000"/></marker></defs>
    <g font-family="Times New Roman" fill="#000" text-anchor="middle">
      <rect x="14" y="72" width="145" height="102" fill="#fff" stroke="#000"/><text x="86" y="102" font-size="14" font-weight="bold">FRICTION</text><text x="86" y="128" font-size="12">slow replies</text><text x="86" y="148" font-size="12">staff changes</text>
      <rect x="184" y="72" width="145" height="102" fill="#eee" stroke="#000"/><text x="256" y="102" font-size="14" font-weight="bold">TRIGGER</text><text x="256" y="128" font-size="12">surprise bill</text><text x="256" y="148" font-size="12">deadline or move</text>
      <rect x="354" y="72" width="145" height="102" fill="#ddd" stroke="#000"/><text x="426" y="102" font-size="14" font-weight="bold">DOUBT</text><text x="426" y="128" font-size="12">what am I</text><text x="426" y="148" font-size="12">paying for?</text>
      <rect x="524" y="72" width="145" height="102" fill="#000" stroke="#000"/><text x="596" y="102" font-size="14" font-weight="bold" fill="#fff">SWITCH</text><text x="596" y="128" font-size="12" fill="#fff">when transfer</text><text x="596" y="148" font-size="12" fill="#fff">feels controlled</text>
      <line x1="159" y1="123" x2="180" y2="123" stroke="#000" marker-end="url(#a3)"/><line x1="329" y1="123" x2="350" y2="123" stroke="#000" marker-end="url(#a3)"/><line x1="499" y1="123" x2="520" y2="123" stroke="#000" marker-end="url(#a3)"/>
      <text x="340" y="215" font-size="13" font-style="italic">The new accountant must make professional clearance and catch-up work legible.</text>
    </g></svg>""",
)

COMPETITOR_MAP = fig(
    "Figure 7. SRJ should sit above routine compliance without pretending to be a foreign-law or transaction firm.",
    r"""<svg viewBox="0 0 680 350" role="img" aria-label="Accountancy competitor map">
    <g font-family="Times New Roman" fill="#000">
      <line x1="92" y1="298" x2="640" y2="298" stroke="#000"/><line x1="92" y1="298" x2="92" y2="35" stroke="#000"/>
      <text x="365" y="337" text-anchor="middle" font-size="12">GENERAL PRACTICE  ->  SPECIFIC BUYER OR PROBLEM</text>
      <text transform="translate(27 180) rotate(-90)" text-anchor="middle" font-size="12">ROUTINE PROCESSING  ->  SENIOR JUDGMENT</text>
      <line x1="366" y1="45" x2="366" y2="298" stroke="#aaa" stroke-dasharray="4 4"/><line x1="92" y1="170" x2="640" y2="170" stroke="#aaa" stroke-dasharray="4 4"/>
      <circle cx="185" cy="248" r="7"/><text x="197" y="252" font-size="12">Crunch</text>
      <circle cx="255" cy="218" r="7"/><text x="267" y="222" font-size="12">local practices</text>
      <circle cx="492" cy="232" r="7"/><text x="504" y="236" font-size="12">Alto</text>
      <circle cx="535" cy="185" r="7"/><text x="547" y="189" font-size="12">Sidekick / Wow</text>
      <circle cx="524" cy="92" r="7"/><text x="536" y="96" font-size="12">UK-UAE boutiques</text>
      <rect x="268" y="78" width="104" height="48" fill="#000"/><text x="320" y="107" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">SRJ</text>
      <text x="118" y="60" font-size="11" font-style="italic">Direct CTA/ACA judgment</text>
    </g></svg>""",
)

HOMEPAGE_FLOW = fig(
    "Figure 9. The homepage follows the buyer's risk in order. Detailed tax content comes after the principal conversion path.",
    r"""<svg viewBox="0 0 680 350" role="img" aria-label="Recommended SRJ homepage sequence">
    <g font-family="Times New Roman" fill="#000">
      <g font-size="12.5">
        <rect x="15" y="24" width="205" height="52" fill="#000"/><text x="117" y="55" text-anchor="middle" fill="#fff" font-weight="bold">1  PROMISE + AUTHORITY</text>
        <rect x="238" y="24" width="205" height="52" fill="#eee" stroke="#000"/><text x="340" y="55" text-anchor="middle" font-weight="bold">2  CURRENT STATE</text>
        <rect x="461" y="24" width="205" height="52" fill="#ddd" stroke="#000"/><text x="563" y="55" text-anchor="middle" font-weight="bold">3  MECHANISM</text>
        <rect x="15" y="102" width="205" height="52" fill="#eee" stroke="#000"/><text x="117" y="133" text-anchor="middle" font-weight="bold">4  DECISION DOORS</text>
        <rect x="238" y="102" width="205" height="52" fill="#ddd" stroke="#000"/><text x="340" y="133" text-anchor="middle" font-weight="bold">5  FIT + FIRST STEP</text>
        <rect x="461" y="102" width="205" height="52" fill="#eee" stroke="#000"/><text x="563" y="133" text-anchor="middle" font-weight="bold">6  HOW IT WORKS</text>
        <rect x="15" y="180" width="205" height="52" fill="#ddd" stroke="#000"/><text x="117" y="211" text-anchor="middle" font-weight="bold">7  SERVICES</text>
        <rect x="238" y="180" width="205" height="52" fill="#eee" stroke="#000"/><text x="340" y="211" text-anchor="middle" font-weight="bold">8  TESTIMONIALS</text>
        <rect x="461" y="180" width="205" height="52" fill="#ddd" stroke="#000"/><text x="563" y="211" text-anchor="middle" font-weight="bold">9  ABOUT SIMON</text>
        <rect x="126" y="258" width="205" height="52" fill="#eee" stroke="#000"/><text x="228" y="289" text-anchor="middle" font-weight="bold">10  PLAIN-ENGLISH ADVICE</text>
        <rect x="349" y="258" width="205" height="52" fill="#000"/><text x="451" y="289" text-anchor="middle" fill="#fff" font-weight="bold">11  FINAL CTA</text>
      </g>
    </g></svg>""",
)


FIGURES = {
    1: THREE_LAYERS,
    2: MARKET_FUNNEL,
    5: DECISION_CALENDAR,
    6: OWNER_SYSTEM,
    8: CROSS_BORDER,
    10: SWITCHING,
    13: COMPETITOR_MAP,
    16: HOMEPAGE_FLOW,
}


def screenshot_figure():
    return (
        f'<figure class="fig"><img src="{HOME_SHOT}" alt="The previous SRJ homepage, led by marketing-agency positioning">'
        '<figcaption>Figure 8. The previous homepage led with marketing agencies. The design can stay; the category signal and copy sequence must change.</figcaption></figure>'
    )


def slug(text):
    return "x" + re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:60]


def inline(text):
    text = html.escape(text, quote=True)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
        text,
    )
    text = re.sub(
        r"\[\^([A-Za-z0-9_-]+)\]",
        lambda m: f'<sup class="fn"><a href="#fn-{m.group(1)}">{FOOTNOTE_NUM.get(m.group(1), m.group(1))}</a></sup>',
        text,
    )
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(r"`(.+?)`", r"<span class=\"code\">\1</span>", text)
    return text


lines = SOURCE_TEXT.splitlines()
out = []
toc = []
i = 0
in_sources = False

# Bespoke front matter preserves the Sparky book's title-page rhythm.
title = lines[0].removeprefix("# ").strip()
subtitle = lines[2].removeprefix("### ").strip()
meta = lines[4].strip("*")
out.append(
    '<div class="titlepage">'
    f'<h1 class="title">{inline(title)}</h1>'
    f'<p class="sub">{inline(subtitle)}</p>'
    f'<p class="meta">{inline(meta)}<br><br>Prepared for the SRJ International engagement.</p>'
    '</div>'
)
i = 5

while i < len(lines):
    raw = lines[i]
    s = raw.strip()
    if not s or s == "---":
        i += 1
        continue

    # Markdown table.
    if s.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s:|-]+\|$", lines[i + 1].strip()):
        head = [c.strip() for c in s.strip("|").split("|")]
        i += 2
        rows = []
        while i < len(lines) and lines[i].strip().startswith("|"):
            rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
            i += 1
        out.append("<table><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr>")
        for row in rows:
            out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>")
        out.append("</table>")
        continue

    # Source definitions.
    m = re.match(r"^\[\^([A-Za-z0-9_-]+)\]:\s*(.*)$", s)
    if m:
        label = FOOTNOTE_NUM.get(m.group(1), m.group(1))
        out.append(f'<p class="source" id="fn-{m.group(1)}"><sup>{label}</sup> {inline(m.group(2))}</p>')
        i += 1
        continue

    m = re.match(r"^(#{1,3})\s+(.*)$", s)
    if m:
        level = len(m.group(1))
        text = m.group(2)
        if level == 1:
            i += 1
            continue
        if level == 2:
            chapter_match = re.match(r"^(\d+)\.\s+(.*)$", text)
            if chapter_match:
                number = int(chapter_match.group(1))
                if number == 1:
                    out.append('</div><!--TOC-->')
                if number in PARTS:
                    part_id = slug(PARTS[number])
                    out.append(f'<h1 class="part" id="{part_id}">{PARTS[number]}</h1>')
                    toc.append(("part", PARTS[number], part_id, ""))
                chap_id = slug(text)
                out.append(f'<h1 class="chap" id="{chap_id}">Chapter {number} - {inline(chapter_match.group(2))}</h1>')
                toc.append(("chap", chapter_match.group(2), chap_id, str(number)))
                if number in FIGURES:
                    out.append(FIGURES[number])
                if number == 14:
                    out.append(screenshot_figure())
            elif text == "Abstract":
                out.append('<div class="front"><h1>Abstract</h1>')
            elif text == "How to read this primer":
                out.append('</div><div class="front"><h1>How to use this book</h1>')
            elif text == "Sources":
                in_sources = True
                source_id = "xsources"
                out.append(f'<h1 class="chap sources" id="{source_id}">Appendix A - Sources</h1><div class="sources">')
                toc.append(("chap", "Sources", source_id, "A"))
            else:
                out.append(f"<h2>{inline(text)}</h2>")
        else:
            out.append(f"<h3>{inline(text)}</h3>")
        i += 1
        continue

    if s.startswith(">"):
        buf = []
        while i < len(lines) and lines[i].strip().startswith(">"):
            buf.append(lines[i].strip().lstrip(">").strip())
            i += 1
        out.append(f'<blockquote><p>{inline(" ".join(buf))}</p></blockquote>')
        continue

    if re.match(r"^[-*]\s+", s):
        out.append("<ul>")
        while i < len(lines) and re.match(r"^[-*]\s+", lines[i].strip()):
            item = re.sub(r"^[-*]\s+", "", lines[i].strip())
            out.append(f"<li>{inline(item)}</li>")
            i += 1
        out.append("</ul>")
        continue

    if re.match(r"^\d+\.\s+", s):
        out.append("<ol>")
        while i < len(lines) and re.match(r"^\d+\.\s+", lines[i].strip()):
            item = re.sub(r"^\d+\.\s+", "", lines[i].strip())
            out.append(f"<li>{inline(item)}</li>")
            i += 1
        out.append("</ol>")
        continue

    buf = [s]
    i += 1
    while i < len(lines):
        nxt = lines[i].strip()
        if not nxt or nxt == "---" or re.match(r"^(#{1,3}\s|[-*]\s|\d+\.\s|\||>|\[\^[^]]+\]:)", nxt):
            break
        buf.append(nxt)
        i += 1
    cls = ' class="source"' if in_sources else ""
    out.append(f"<p{cls}>{inline(' '.join(buf))}</p>")

if in_sources:
    out.append("</div>")

toc_html = ['<h2>Contents</h2><div class="toc">']
for kind, text, anchor, number in toc:
    if kind == "part":
        toc_html.append(f'<div class="part"><a href="#{anchor}">{inline(text)}</a></div>')
    else:
        toc_html.append(f'<div class="item"><a href="#{anchor}"><span class="n">{number}</span>{inline(text)}</a></div>')
toc_html.append("</div>")

document = "\n".join(out).replace("<!--TOC-->", "\n".join(toc_html))
html_doc = (
    '<!doctype html><html><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    f'<title>{html.escape(title)}</title><style>{CSS}</style></head><body>'
    + document
    + "</body></html>"
)
DST.write_text(html_doc, encoding="utf-8")
print(f"wrote {DST} ({len(toc)} contents entries)")
