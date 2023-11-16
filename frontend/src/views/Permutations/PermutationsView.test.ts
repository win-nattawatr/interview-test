import { shallowMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PermutationsView from "./PermutationsView.vue";
import { AxiosError } from "axios";

describe("PermutationsView", () => {
	const mockPermutationsService = vi.hoisted(() => ({
		getPermutations: vi.fn(),
	}));

	beforeEach(() => {
		vi.useFakeTimers();
		vi.mock("../../composables/permutations.service", () => ({
			usePermutationsService: () => mockPermutationsService,
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be rendered properly", () => {
		const wrapper = shallowMount(PermutationsView);
		expect(wrapper).toBeDefined();
	});

	it("Should be display result when input changed", async () => {
		const mockInput = "abc";
		mockPermutationsService.getPermutations.mockImplementation(() => {
			return Promise.resolve("abc, acb, bac, bca, cab, cba");
		});

		const wrapper = shallowMount(PermutationsView);
		const input = wrapper.find<HTMLInputElement>("#permutations-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#permutations-result");
		expect(result.element.value).toEqual("abc, acb, bac, bca, cab, cba");

		await input.setValue("");

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		expect(result.element.value).toEqual("");
	});

	it("Should be display error message from server", async () => {
		const mockInput = "1 2 2";
		mockPermutationsService.getPermutations.mockImplementation(() => {
			return Promise.reject(new AxiosError("error", "500"));
		});

		const wrapper = shallowMount(PermutationsView);
		const input = wrapper.find<HTMLInputElement>("#permutations-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#permutations-result");
		expect(result.element.value).toEqual(`error`);
	});
});
