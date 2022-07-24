export interface ShortLink {
	// ShortLink is the name of the model
	id: number;
	url: string;
	slug: string;
}

export interface ShortLinkCreate {
	// create short link
	url: string;
	slug: string;
}
