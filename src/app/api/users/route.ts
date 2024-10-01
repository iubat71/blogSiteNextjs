import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { use } from "react";

const prisma = new PrismaClient();
// To handle a GET request to /api
export async function GET(request: NextRequest,res:NextResponse) {
  try {
    // Note: request.body for GET requests usually doesn't contain any body.
    const url = request.nextUrl; // or request.url to get full URL
    const user=await prisma.user.findMany()
    const allUsers = await prisma.user.findMany()
    
    console.log(allUsers); // If you want to log the request URL

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
    // console.log(typeof body)
    const user=await prisma.user.create({data:body})

    // console.log(user); // Log the request body

    // Do whatever you want with the body
    return NextResponse.json({ message: "POST request successful", data: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while processing the POST request." }, { status: 500 });
  }
}
