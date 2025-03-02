import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        // Ensure body is not empty
        const body = await req.json().catch(() => null);
        if (!body || !body.image || !body.folder) {
            return NextResponse.json({ error: "Missing image data or folder name" }, { status: 400 });
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(body.image, {
            folder: body.folder, // e.g., "id_cards" or "profile_pictures"
        });

        // Return the image URL
        return NextResponse.json({ imageUrl: uploadResponse.secure_url }, { status: 201 });

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
