import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
	if (
		req.nextUrl.pathname.startsWith('/api/') ||
		req.nextUrl.pathname.startsWith('/user/')
	) {
		return;
	}

	const slug = req.nextUrl.pathname.split('/').pop();
	if (
		!slug ||
		slug?.includes('.') ||
		slug === '' ||
		['create'].includes(slug)
	) {
		return;
	}

	const data = await (
		await fetch(`${req.nextUrl.origin}/api/url/${slug}`)
	).json();
	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
};

export default middleware;
