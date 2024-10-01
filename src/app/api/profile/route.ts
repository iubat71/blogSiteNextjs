import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';  // Import Prisma Client

const prisma = new PrismaClient();  // Instantiate Prisma Client

export async function POST(req) {
  // Parse the incoming form data
  const formData = await req.formData();
  
  const bio = formData.get('bio');
  const authorId = parseInt(formData.get('authorId'), 10);  // Ensure it's an integer
  const image = formData.get('imageUrl');

  // Directory where images will be stored (in public/images)
  const imagesDirectory = path.join(process.cwd(), 'public/images');

  // Ensure the directory exists
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  // Process the image and save it in public/images
  let imageUrl = null;
  if (image) {
    const buffer = await image.arrayBuffer();
    const imageName = `uploaded-${Date.now()}.jpg`; // Example naming convention
    const imagePath = path.join(imagesDirectory, imageName);

    // Save the image to public/images
    fs.writeFileSync(imagePath, Buffer.from(buffer));

    imageUrl = `/images/${imageName}`;  // URL to access the image
  }

  // Save the profile data to the database
  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        author: {
          connect: { id: authorId },  // Link to existing user
        },
        imageUrl,  // Save the image URL
      },
    });

    // Return the response with the created profile
    return NextResponse.json({
      profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json({ error: "Failed to create profile." }, { status: 500 });
  } finally {
    await prisma.$disconnect();  // Clean up the Prisma client
  }
}
