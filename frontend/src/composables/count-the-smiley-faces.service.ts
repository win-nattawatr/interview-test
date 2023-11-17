import { useAxios } from "./axios-instance";

export const useCountTheSmileyFacesService = () => {
	const { axiosInstance } = useAxios();

	const find = async (input: string[]) => {
		const result = await axiosInstance.post<number>(`/api/service/countTheSmileyFaces`, { input });
		return result.data;
	};

	return { find };
};
