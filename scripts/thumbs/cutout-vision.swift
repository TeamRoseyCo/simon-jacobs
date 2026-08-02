// Lifts the subject out of a photo using Vision's foreground instance mask, the
// same thing Preview's "Remove Background" uses. Writes a PNG with a real alpha
// channel.
//
// This exists because a colour key cannot cut this particular photo: Simon is
// bald and lit from above, so the top of his head is almost exactly the same
// grey as the backdrop, and any threshold loose enough to clear the backdrop's
// gradient also eats into his head.
//
// Built and invoked by cutout.mjs. Standalone:
//   swiftc -O scripts/thumbs/cutout-vision.swift -o /tmp/cutout-vision
//   /tmp/cutout-vision in.jpg out.png
//
// Requires macOS 14 or newer.

import AppKit
import CoreImage
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: cutout-vision <input> <output.png>\n".data(using: .utf8)!)
    exit(2)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

func fail(_ message: String) -> Never {
    FileHandle.standardError.write("cutout-vision: \(message)\n".data(using: .utf8)!)
    exit(1)
}

guard let image = CIImage(contentsOf: inputURL) else { fail("cannot read \(inputURL.path)") }

let handler = VNImageRequestHandler(ciImage: image, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([request])
} catch {
    fail("Vision failed: \(error.localizedDescription)")
}

guard let observation = request.results?.first else { fail("no foreground subject found") }

// allInstances rather than a single index: a portrait can come back as more
// than one instance (head, body) and we want the lot.
let masked: CVPixelBuffer
do {
    masked = try observation.generateMaskedImage(
        ofInstances: observation.allInstances,
        from: handler,
        croppedToInstancesExtent: false
    )
} catch {
    fail("could not build the masked image: \(error.localizedDescription)")
}

let output = CIImage(cvPixelBuffer: masked)
let context = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])

guard let cgImage = context.createCGImage(
    output,
    from: output.extent,
    format: .RGBA8,
    colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
) else { fail("could not rasterise the result") }

let rep = NSBitmapImageRep(cgImage: cgImage)
rep.size = NSSize(width: cgImage.width, height: cgImage.height)

guard let png = rep.representation(using: .png, properties: [:]) else { fail("could not encode PNG") }

do {
    try png.write(to: outputURL)
} catch {
    fail("could not write \(outputURL.path): \(error.localizedDescription)")
}

print("cutout-vision: \(cgImage.width)x\(cgImage.height), \(observation.allInstances.count) instance(s)")
