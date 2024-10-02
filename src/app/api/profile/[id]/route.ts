import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router'
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();
// Define a GET method to fetch a user by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;  
 
  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.profile.findUnique({
      where: {
        id: parseInt(userId),  
      },
      include: {
        author: {
          select: {
            name: true,
            email:true,
          },
        },
    },
    });


    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
   
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req ,{ params }: { params: { id: string } }) {
  const userId = params.id;  
//   const body = await request.json();
const formData = await req.formData();
  
const bio = formData.get('bio');
const authorId = parseInt(formData.get('authorId'), 10);  // Ensure it's an integer
const image = formData.get('imageUrl');

const imagesDirectory = path.join(process.cwd(), 'public/images');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

let imageUrl = null;
if (image) {
  const buffer = await image.arrayBuffer();
  const imageName = `uploaded-${Date.now()}.jpg`; 
  const imagePath = path.join(imagesDirectory, imageName);

  fs.writeFileSync(imagePath, Buffer.from(buffer));

  imageUrl = `/images/${imageName}`;  
}


  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.profile.update({
      where: {
        id: parseInt(userId),  
      },
      data: {
        bio,
        author: {
          connect: { id: authorId },  
        },
        imageUrl,  
      },
    })


    if (!user) {
      return NextResponse.json({ error: 'User not Update' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
   
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;  
  const body = await request.json();
  

  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.profile.update({
      where: {
        id: parseInt(userId),  
      },
      data:body
    })


    if (!user) {
      return NextResponse.json({ error: 'User not Update' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
   
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}