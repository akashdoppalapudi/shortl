import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import ShortLinkForm from '../components/ShortLinkForm';
import { ShortLink, ShortLinkCreate } from '../models/ShortLink';

const Create: NextPage = () => {
	const [shortLinkSlug, setShortLinkSlug] = useState<string>('');
	const [pageOrigin, setPageOrigin] = useState('');

	useEffect(() => {
		setPageOrigin(window.location.origin);
	}, []);

	const submitHandler = async (shortLink: ShortLinkCreate) => {
		const res = await fetch('/api/url/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(shortLink),
		});
		const data: ShortLink = await res.json();
		setShortLinkSlug(data.slug);
	};

	return (
		<div className="h-screen flex justify-center bg-gray-900">
			<div className="w-11/12 md:w-1/3 flex flex-col justify-center">
				<h3 className="text-center text-slate-300 text-2xl tracking-widest font-bold mb-4">
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
							<svg
								onClick={() =>
									navigator.clipboard.writeText(
										`${pageOrigin}/${shortLinkSlug}`
									)
								}
								className="hover:cursor-pointer w-1/12"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
								<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
							</svg>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Create;
