import { useAxios } from "./axios-instance";

export const usePermutationsService = () => {
	const { axiosInstance } = useAxios();

	const getPermutations = async (input: string) => {
		const result = await axiosInstance.post<string[]>(`/api/service/permutations`, { input });
		return result.data;
	};

	return { getPermutations };
};
