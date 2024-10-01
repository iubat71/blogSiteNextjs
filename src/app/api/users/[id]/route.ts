import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router'

const prisma = new PrismaClient();
// Define a GET method to fetch a user by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;  

  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),  
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;  
  const body = await request.json();
  

  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.user.update({
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


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;  
  const body = await request.json();
  

  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.user.update({
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