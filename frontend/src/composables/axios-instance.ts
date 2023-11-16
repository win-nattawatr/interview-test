import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance;
const createAxiosInstance = () => {
	axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BASE_API_URL,
	});
};

export const useAxios = () => {
	if (!axiosInstance) createAxiosInstance();

	return { axiosInstance };
};
