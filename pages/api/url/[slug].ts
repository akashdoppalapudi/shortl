import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query.slug;
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	if (!slug || slug.length === 0 || typeof slug !== 'string') {
		res.status(400).json({ message: 'Missing slug' });
		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		// if short link is not found
		res.statusCode = 404;
		res.json({ message: 'Slug Not found' });
		return;
	}

	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Cache-Control', 's-maxage=10000, stale-while-revalidate'); // cache for 10000 seconds

	return res.json(data);
};

export default handler;
