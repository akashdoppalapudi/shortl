import { useState } from 'react';
import type { ShortLink, ShortLinkCreate } from '../models/ShortLink';

interface ShortLinkFormProps {
	shortLink: ShortLink | ShortLinkCreate;
	onSubmit: (shortLink: ShortLink | ShortLinkCreate) => void;
}

const ShortLinkForm = (props: ShortLinkFormProps) => {
	const [shortLink, setShortLink] = useState(props.shortLink);
	const [slugTaken, setSlugTaken] = useState(false);
	const [validUrl, setValidUrl] = useState(true);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit(shortLink);
	};

	const checkSlugAvailability = async (slug: string) => {
		const res = await fetch(`/api/url/${slug}`);
		if (res.status == 404) {
			setSlugTaken(false);
			return;
		}
		setSlugTaken(true);
	};

	const checkUrlValidity = async (url: string) => {
		let link: URL;

		try {
			link = new URL(url);
			if (link.protocol === 'http:' || link.protocol === 'https:') {
				setValidUrl(true);
			}
		} catch (_) {
			setValidUrl(false);
			return;
		}
	};

	return (
		<div className="bg-black p-4 text-slate-400 font-medium rounded-lg">
			<form
				className="flex flex-col w-full gap-2 bg-black"
				onSubmit={submitHandler}
			>
				<label>URL* : </label>
				{!validUrl && (
					<span className="text-xs text-red-500">Enter a valid URL</span>
				)}
				<input
					required
					placeholder="Enter yopur URL here... (check before entering)"
					type="url"
					className="border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8 placeholder:text-xs placeholder:text-slate-600"
					value={shortLink.url}
					onChange={(e) => {
						checkUrlValidity(e.target.value);
						setShortLink({ ...shortLink, url: e.target.value });
					}}
				/>
				<label>Slug* : </label>
				{slugTaken && (
					<span className="text-xs text-red-500">
						Slug is already taken. Enter a unique slug
					</span>
				)}
				<input
					required
					placeholder="Enter your custom slug... (End link will be [https://shortl.vercel.app/<slug>])"
					type="text"
					className="border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8 placeholder:text-xs placeholder:text-slate-600"
					value={shortLink.slug}
					onChange={(e) => {
						checkSlugAvailability(e.target.value);
						setShortLink({ ...shortLink, slug: e.target.value });
					}}
				/>
				<button
					type="submit"
					className="mx-auto mt-2 p-2 bg-gray-900 font-semibold rounded-md w-3/4 hover:opacity-95 disabled:cursor-not-allowed"
					disabled={
						slugTaken ||
						shortLink.url === '' ||
						shortLink.slug === '' ||
						!validUrl
					}
				>
					Shorten!
				</button>
			</form>
		</div>
	);
};

export default ShortLinkForm;
