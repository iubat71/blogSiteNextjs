import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const category = await prisma.category.create({
        data: { name },
      });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Category creation failed' });
    }
  } else if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
