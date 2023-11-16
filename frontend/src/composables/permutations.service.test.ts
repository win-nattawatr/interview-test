import { afterEach, describe, expect, it, vi } from "vitest";
import { usePermutationsService } from "./permutations.service";
import { useAxios } from "./axios-instance";
import { AxiosError } from "axios";

describe("permutations.service", () => {
	const { axiosInstance } = useAxios();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be defined", () => {
		const permutationsService = usePermutationsService();
		expect(permutationsService).toBeDefined();
	});

	it("Should be return response from 'getPermutations'", async () => {
		const mockinput = "ab";
		const mockResponse = ["ab", "ba"];

		vi.spyOn(axiosInstance, "post").mockResolvedValue({ data: mockResponse });

		const permutationsService = usePermutationsService();
		expect(await permutationsService.getPermutations(mockinput)).toEqual(mockResponse);
	});

	it("Should be throw AxiosError from 'getPermutations'", async () => {
		const mockinput = "ab";

		vi.spyOn(axiosInstance, "post").mockRejectedValue(new AxiosError("error"));

		const permutationsService = usePermutationsService();
		await expect(permutationsService.getPermutations(mockinput)).rejects.toThrowError(AxiosError);
	});
});
