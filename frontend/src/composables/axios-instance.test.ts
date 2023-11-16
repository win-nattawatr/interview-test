import { describe, expect, it } from "vitest";
import { useAxios } from "./axios-instance";

describe("axios-instance", () => {
	it("Should be defined", () => {
		const { axiosInstance } = useAxios();
		expect(axiosInstance).toBeDefined();
	});

	it("Should be valid config", () => {
		const { axiosInstance } = useAxios();
		expect(axiosInstance.defaults.baseURL).toEqual(import.meta.env.VITE_BASE_API_URL);
	});
});
