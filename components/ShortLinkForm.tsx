import { useEffect, useState } from 'react';
import type { ShortLink, ShortLinkCreate } from '../models/ShortLink';

interface ShortLinkFormProps {
	shortLink: ShortLink | ShortLinkCreate;
	onSubmit: (shortLink: ShortLink | ShortLinkCreate) => void;
}

const ShortLinkForm = (props: ShortLinkFormProps) => {
	const [shortLink, setShortLink] = useState(props.shortLink);
	const [slugTaken, setSlugTaken] = useState(false);
	const [validUrl, setValidUrl] = useState(true);
	const [pageOrigin, setPageOrigin] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setPageOrigin(window.location.origin);
	}, []);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit(shortLink);
		clearFields();
	};

	const clearFields = () => {
		setShortLink({
			...shortLink,
			slug: '',
			url: '',
		});
	};

	const checkSlugAvailability = async (slug: string) => {
		setIsLoading(true);
		const res = await fetch(`/api/url/${slug}`);
		setIsLoading(false);
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
				<label>URL * : </label>
				{!validUrl && (
					<span className="text-xs text-red-500">Enter a valid URL</span>
				)}
				<input
					required
					placeholder="Enter your URL here... (check before entering)"
					type="url"
					className="pl-1 border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8 placeholder:text-xs placeholder:text-slate-600"
					value={shortLink.url}
					onChange={(e) => {
						checkUrlValidity(e.target.value);
						setShortLink({ ...shortLink, url: e.target.value });
					}}
				/>
				<div className="flex justify-between items-center">
					<label>Slug * : </label>
					{isLoading && (
						<svg
							className="text-slate-400 animate-spin mr-1"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
							/>
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
						</svg>
					)}
				</div>
				{slugTaken && (
					<span className="text-xs text-red-500">
						Slug is already taken. Enter a unique slug
					</span>
				)}
				<input
					required
					maxLength={50}
					placeholder={`Enter your custom slug... (End link will be [${pageOrigin}/<slug>])`}
					type="text"
					className="pl-1 border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8 placeholder:text-xs placeholder:text-slate-600"
					value={shortLink.slug}
					onChange={(e) => {
						checkSlugAvailability(e.target.value);
						setShortLink({ ...shortLink, slug: e.target.value });
					}}
				/>
				<button
					type="submit"
					className="mx-auto mt-2 p-2 bg-green-600 opacity-60 text-black disabled:bg-slate-600 disabled:text-gray-900 font-semibold rounded-md w-3/4 hover:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-200"
					disabled={
						slugTaken ||
						shortLink.url === '' ||
						shortLink.slug === '' ||
						!validUrl ||
						isLoading
					}
				>
					Shorten!
				</button>
			</form>
		</div>
	);
};

export default ShortLinkForm;
