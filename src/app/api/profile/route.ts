import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';  
const prisma = new PrismaClient();  
const user = await prisma.user.findUnique({
  omit: {
    email: true,
    password: true,
  },
  where: {
    id: 1,
  },
})
export async function GET(request: NextRequest,res:NextResponse) {
  try {
 
    const allProfile = await prisma.profile.findMany()
    return NextResponse.json({ data: allProfile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while processing the GET request." }, { status: 500 });
  }
}

export async function POST(req) {
  // Parse the incoming form data
  const formData = await req.formData();
  
  const bio = formData.get('bio');
  const authorId = parseInt(formData.get('authorId'), 10);  // Ensure it's an integer
  const image = formData.get('imageUrl');

  const imagesDirectory = path.join(process.cwd(), 'public/images');

  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  // Process the image and save it in public/images
  let imageUrl = null;
  if (image) {
    const buffer = await image.arrayBuffer();
    const imageName = `uploaded-${Date.now()}.jpg`; // Example naming convention
    const imagePath = path.join(imagesDirectory, imageName);

    fs.writeFileSync(imagePath, Buffer.from(buffer));

    imageUrl = `/images/${imageName}`;  
  }

  // Save the profile data to the database
  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        author: {
          connect: { id: authorId },  
        },
        imageUrl,  
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


