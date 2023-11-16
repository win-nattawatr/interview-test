import { afterEach, describe, expect, it, vi } from "vitest";
import { useAxios } from "./axios-instance";
import { AxiosError } from "axios";
import { useFindTheOddIntService } from "./find-the-odd-int.service";

describe("find-the-odd-int.service", () => {
	const { axiosInstance } = useAxios();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be defined", () => {
		const findTheOddIntService = useFindTheOddIntService();
		expect(findTheOddIntService).toBeDefined();
	});

	it("Should be return response from 'find'", async () => {
		const mockinput = [1, 2, 2];
		const mockResponse = 1;

		vi.spyOn(axiosInstance, "post").mockResolvedValue({ data: mockResponse });

		const findTheOddIntService = useFindTheOddIntService();
		expect(await findTheOddIntService.find(mockinput)).toEqual(mockResponse);
	});

	it("Should be throw AxiosError from 'find'", async () => {
		const mockinput = [1, 2, 2];

		vi.spyOn(axiosInstance, "post").mockRejectedValue(new AxiosError("error"));

		const findTheOddIntService = useFindTheOddIntService();
		await expect(findTheOddIntService.find(mockinput)).rejects.toThrowError(AxiosError);
	});
});
