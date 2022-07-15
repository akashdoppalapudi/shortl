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

	const newShortLink = await prisma.shortLink.create({ data: body });

	res.json(newShortLink);
};

export default handler;
