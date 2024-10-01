import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  // Parse the incoming form data
  const formData = await req.formData();
  const bio = formData.get('bio');
  const authorId = formData.get('authorId');
  const image = formData.get('imageUrl');

  // Directory where images will be stored
  const imagesDirectory = path.join(process.cwd(), 'src/app/images');

  // Ensure the directory exists
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  // Process the image and save it in src/app/images
  let imageUrl = null;
  if (image) {
    const buffer = await image.arrayBuffer();
    const imageName = `uploaded-${Date.now()}.jpg`; // Example naming convention
    const imagePath = path.join(imagesDirectory, imageName);

    // Save the image to src/app/images
    fs.writeFileSync(imagePath, Buffer.from(buffer));

    imageUrl = `/images/${imageName}`;  // URL to access the image
  }

  // Return the response (you would persist this data using Prisma)
  return NextResponse.json({
    bio,
    authorId,
    imageUrl,
  });
}
