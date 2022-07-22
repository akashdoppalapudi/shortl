import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
	if (
		req.nextUrl.pathname.startsWith('/api/') ||
		req.nextUrl.pathname.startsWith('/user/')
	) {
		return;
	}

	if (req.nextUrl.pathname === '/') {
		return NextResponse.redirect(`${req.nextUrl.origin}/create`); // redirect to /create is temporary... may remove in future
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
