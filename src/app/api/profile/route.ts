import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bio, userId } = req.body;

    try {
      const profile = await prisma.profile.create({
        data: {
          bio,
          user: { connect: { id: userId } },
        },
      });
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(500).json({ error: 'Profile creation failed' });
    }
  } else if (req.method === 'GET') {
    try {
      const profiles = await prisma.profile.findMany();
      return res.status(200).json(profiles);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch profiles' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
