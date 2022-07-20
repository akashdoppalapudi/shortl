import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db/client';
import { ShortLinkCreate } from '../../../models/ShortLink';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		// if method is not POST
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const body: ShortLinkCreate = req.body;

	const slugCount = await prisma.shortLink.count({
		where: {
			slug: {
				equals: body.slug,
			},
		},
	});
	if (slugCount > 0) {
		// if slug is already taken
		res.status(400).json({ message: 'Slug already taken' });
		return;
	}

	const newShortLink = await prisma.shortLink.create({ data: body });

	return res.json(newShortLink);
};

export default handler;
