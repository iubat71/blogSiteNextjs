import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, authorId, published, categories } = req.body;

    try {
      const post = await prisma.post.create({
        data: {
          title,
          published,
          author: { connect: { id: authorId } },
          categories: { connect: categories.map((id: number) => ({ id })) },
        },
      });
      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Post creation failed' });
    }
  } else if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
