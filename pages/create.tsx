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
		<>
			<ShortLinkForm
				shortLink={{ url: '', slug: '' }}
				onSubmit={submitHandler}
			/>
		</>
	);
};

export default Create;
