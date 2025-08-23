import { config } from 'dotenv';

config();

export const apiRest = {
	url: process.env.API_REST_URL ?? 'https://localhost',
	login: process.env.API_REST_LOGIN ?? 'test@email.com',
	password: process.env.API_REST_PASSWORD ?? 'password',
};
