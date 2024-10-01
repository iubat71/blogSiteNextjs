import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    const { email, name, role } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          role,
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'User creation failed' });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
