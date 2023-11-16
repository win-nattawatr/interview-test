import { useAxios } from "./axios-instance";

export const useFindTheOddIntService = () => {
	const { axiosInstance } = useAxios();

	const find = async (input: number[]) => {
		const result = await axiosInstance.post<number>(`/api/service/findTheOddInt`, { input });
		return result.data;
	};

	return { find };
};
