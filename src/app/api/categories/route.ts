import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { use } from "react";

const prisma = new PrismaClient();
// To handle a GET request to /api
export async function GET(request: NextRequest,res:NextResponse) {
  try {
    // Note: request.body for GET requests usually doesn't contain any body.

    const allUsers = await prisma.category.findMany()
    

    return NextResponse.json({ data: allUsers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while processing the GET request." }, { status: 500 });
  }
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user=await prisma.category.create({data:body})

    return NextResponse.json({ message: "POST request successful", data: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while processing the POST request." }, { status: 500 });
  }
}
