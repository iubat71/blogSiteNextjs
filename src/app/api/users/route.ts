import { NextResponse, NextRequest } from "next/server";
// import { PrismaClient } from '@prisma/client';
import { use } from "react";

// const prisma = new PrismaClient();
import { PrismaClient, Prisma } from '@prisma/client'
import { z } from 'zod'

/**
 * Zod schema
 */
export const UserCreateInput = z.object({
  password: z
    .string()
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().max(20),
  email: z.string().max(15),

}) satisfies z.Schema<Prisma.UserCreateInput>

/**
 * Prisma Client Extension
 */
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = UserCreateInput.parse(args.data)
        return query(args)
      },
      update({ args, query }) {
        args.data = UserCreateInput.partial().parse(args.data)
        return query(args)
      },
      updateMany({ args, query }) {
        args.data = UserCreateInput.partial().parse(args.data)
        return query(args)
      },
      upsert({ args, query }) {
        args.create = UserCreateInput.parse(args.create)
        args.update = UserCreateInput.partial().parse(args.update)
        return query(args)
      },
    },
  },
})


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
