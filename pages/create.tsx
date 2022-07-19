import { NextPage } from 'next';

import ShortLinkForm from '../components/ShortLinkForm';
import { ShortLinkCreate } from '../models/ShortLink';

const submitHandler = async (shortLink: ShortLinkCreate) => {
	await fetch('/api/url/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(shortLink),
	});
};

const Create: NextPage = () => {
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
			</div>
		</div>
	);
};

export default Create;
