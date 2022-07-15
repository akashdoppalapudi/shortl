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
		<>
			<form className="flex flex-col w-1/4 gap-2" onSubmit={submitHandler}>
				<label>URL : </label>
				<input
					type="text"
					className="border-2"
					value={shortLink.url}
					onChange={(e) => setShortLink({ ...shortLink, url: e.target.value })}
				/>
				<label>Slug : </label>
				<input
					type="text"
					className="border-2"
					value={shortLink.slug}
					onChange={(e) => setShortLink({ ...shortLink, slug: e.target.value })}
				/>
				<button type="submit" className="p-2 text-white bg-black w-1/2">
					Submit
				</button>
			</form>
		</>
	);
};

export default ShortLinkForm;
