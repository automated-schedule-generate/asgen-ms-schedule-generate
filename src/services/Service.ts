import axios, { type AxiosInstance } from 'axios';
import { apiRest } from '@/config/env';

export default abstract class Service {
	#api: AxiosInstance;
	static #isLogged: boolean = false;
	static #dateLogged: number = 0;

	constructor() {
		this.#api = axios.create({
			baseURL: apiRest.url,
			withCredentials: false,
			withXSRFToken: true,
		});

		this.#api.interceptors.request.use(
			async (config) => {
				if (!Service.#isLogged) {
					await this.login();
				} else {
					if (Date.now() - Service.#dateLogged > 1000 * 60 * 24) {
						await this.login();
					}
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		this.#api.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status === 401) {
					Service.#isLogged = false;
				}
				return Promise.reject(error);
			},
		);
	}

	getApi() {
		return this.#api;
	}

	async login() {
		const { data } = await this.#api.post('/api/users/login', {
			email: apiRest.login,
			password: apiRest.password,
		});

		this.#api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
		Service.#isLogged = true;
		Service.#dateLogged = Date.now();
	}
}
