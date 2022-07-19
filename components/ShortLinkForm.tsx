import { useState } from 'react';
import type { ShortLink, ShortLinkCreate } from '../models/ShortLink';

interface ShortLinkFormProps {
	shortLink: ShortLink | ShortLinkCreate;
	onSubmit: (shortLink: ShortLink | ShortLinkCreate) => void;
}

const ShortLinkForm = (props: ShortLinkFormProps) => {
	const [shortLink, setShortLink] = useState(props.shortLink);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit(shortLink);
	};
	return (
		<div className="bg-black p-4 text-slate-400 font-medium rounded-lg">
			<form
				className="flex flex-col w-full gap-2 bg-black"
				onSubmit={submitHandler}
			>
				<label>URL : </label>
				<input
					type="text"
					className="border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8"
					value={shortLink.url}
					onChange={(e) => setShortLink({ ...shortLink, url: e.target.value })}
				/>
				<label>Slug : </label>
				<input
					type="text"
					className="border-2 border-gray-900 focus:outline-none focus:border-gray-600 rounded-md bg-gray-900 h-8"
					value={shortLink.slug}
					onChange={(e) => setShortLink({ ...shortLink, slug: e.target.value })}
				/>
				<button
					type="submit"
					className="mx-auto mt-2 p-2 bg-gray-900 font-semibold rounded-md w-3/4 hover:opacity-95"
				>
					Shorten!
				</button>
			</form>
		</div>
	);
};

export default ShortLinkForm;
