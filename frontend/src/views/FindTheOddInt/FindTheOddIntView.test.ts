import { shallowMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FindTheOddIntView from "./FindTheOddIntView.vue";
import { AxiosError } from "axios";

describe("FindTheOddIntView", () => {
	const mockFindTheOddIntService = vi.hoisted(() => ({
		find: vi.fn(),
	}));

	beforeEach(() => {
		vi.useFakeTimers();
		vi.mock("../../composables/find-the-odd-int.service", () => {
			return {
				useFindTheOddIntService: () => mockFindTheOddIntService,
			};
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be rendered properly", () => {
		const wrapper = shallowMount(FindTheOddIntView);
		expect(wrapper).toBeDefined();
	});

	it("Should be display valid result when input changed", async () => {
		const mockInput = "1 2 2";
		mockFindTheOddIntService.find.mockImplementation(() => {
			return Promise.resolve(1);
		});

		const wrapper = shallowMount(FindTheOddIntView);
		const input = wrapper.find<HTMLInputElement>("#find-the-odd-int-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#find-the-odd-int-result");
		expect(result.element.value).toEqual("1");

		await input.setValue("");

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		expect(result.element.value).toEqual("");
	});

	it("Should be display error message when input invalid text", async () => {
		const mockInput = "1 2 a";

		const wrapper = shallowMount(FindTheOddIntView);
		const input = wrapper.find<HTMLInputElement>("#find-the-odd-int-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#find-the-odd-int-result");
		expect(result.element.value).toEqual(`[a] is not a number`);
	});

	it("Should be display error message from server", async () => {
		const mockInput = "1 2 2";
		mockFindTheOddIntService.find.mockImplementation(() => {
			return Promise.reject(new AxiosError("error", "500"));
		});

		const wrapper = shallowMount(FindTheOddIntView);
		const input = wrapper.find<HTMLInputElement>("#find-the-odd-int-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#find-the-odd-int-result");
		expect(result.element.value).toEqual(`error`);
	});
});
