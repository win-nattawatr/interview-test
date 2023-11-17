import { afterEach, describe, expect, it, vi } from "vitest";
import { useAxios } from "./axios-instance";
import { AxiosError } from "axios";
import { useCountTheSmileyFacesService } from "./count-the-smiley-faces.service";

describe("count-the-smiley-faces.service", () => {
	const { axiosInstance } = useAxios();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be defined", () => {
		const countTheSmileyFacesService = useCountTheSmileyFacesService();
		expect(countTheSmileyFacesService).toBeDefined();
	});

	it("Should be return response from 'find'", async () => {
		const mockinput = [":-)", ":]", ";-/"];
		const mockResponse = 1;

		vi.spyOn(axiosInstance, "post").mockResolvedValue({ data: mockResponse });

		const countTheSmileyFacesService = useCountTheSmileyFacesService();
		expect(await countTheSmileyFacesService.find(mockinput)).toEqual(mockResponse);
	});

	it("Should be throw AxiosError from 'find'", async () => {
		const mockinput = [":-)", ":]", ";-/"];

		vi.spyOn(axiosInstance, "post").mockRejectedValue(new AxiosError("error"));

		const countTheSmileyFacesService = useCountTheSmileyFacesService();
		await expect(countTheSmileyFacesService.find(mockinput)).rejects.toThrowError(AxiosError);
	});
});
