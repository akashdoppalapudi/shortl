import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ShortLinkForm from '../components/ShortLinkForm';
import { ShortLink, ShortLinkCreate } from '../models/ShortLink';

const Create: NextPage = () => {
	const [shortLinkSlug, setShortLinkSlug] = useState<string>('');
	const [pageOrigin, setPageOrigin] = useState<string>('');
	const [isCopied, setIsCopied] = useState<boolean>(false);

	useEffect(() => {
		setPageOrigin(window.location.origin);
	}, []);

	const submitHandler = async (shortLink: ShortLinkCreate) => {
		setShortLinkSlug('');
		setIsCopied(false);
		const res = await fetch('/api/url/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(shortLink),
		});
		const data: ShortLink = await res.json();
		setShortLinkSlug(data.slug);
	};

	return (
		<div className="h-screen bg-gray-900 text-slate-300">
			<header className="h-[calc(100px)] justify-center flex items-center tracking-widest font-bold">
				<h1 className="text-4xl">ShortL</h1>
			</header>
			<div className="h-[calc(100%_-_150px)] flex justify-center">
				<div className="w-11/12 md:w-1/3 flex flex-col justify-center">
					<h3 className="text-center text-2xl tracking-widest font-bold mb-4">
						Shorten Your Link
					</h3>
					<ShortLinkForm
						shortLink={{ url: '', slug: '' }}
						onSubmit={submitHandler}
					/>
					{shortLinkSlug !== '' && (
						<>
							<h2 className="mt-4 mb-2 text-white text-lg font-semibold">
								Your Short Link
							</h2>
							<div className="text-white flex border-2 border-gray-600 rounded-md h-min-10 p-1 items-center">
								<h3 className="w-11/12 p-2">{`${pageOrigin}/${shortLinkSlug}`}</h3>
								<span className="hover:cursor-pointer hover:bg-slate-500 w-1/12 h-10 py-2 rounded-md flex justify-center">
									<Image
										src="/copy-icon.svg"
										alt="Copy Icon"
										width={24}
										height={24}
										onClick={() => {
											setIsCopied(true);
											navigator.clipboard.writeText(
												`${pageOrigin}/${shortLinkSlug}`
											);
										}}
									/>
								</span>
							</div>
						</>
					)}
					{isCopied && (
						<p className="mt-2 text-sm text-white text-right">
							Copied to clipboard
						</p>
					)}
				</div>
			</div>
			<footer className="h-[calc(50px)] flex items-center px-24">
				<p>
					Built for{' '}
					<a
						className="text-slate-200 underline underline-offset-2"
						href="https://planetscale.com"
					>
						PlanetScale
					</a>{' '}
					X{' '}
					<a
						className="text-slate-200 underline underline-offset-2"
						href="https://hashnode.com"
					>
						Hashnode
					</a>{' '}
					Hackathon
				</p>
			</footer>
		</div>
	);
};

export default Create;
