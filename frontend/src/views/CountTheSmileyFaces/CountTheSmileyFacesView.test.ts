import { shallowMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CountTheSmileyFacesView from "./CountTheSmileyFacesView.vue";
import { AxiosError } from "axios";

describe("CountTheSmileyFacesView", () => {
	const mockCountTheSmileyFacesService = vi.hoisted(() => ({
		find: vi.fn(),
	}));

	beforeEach(() => {
		vi.useFakeTimers();
		vi.mock("../../composables/count-the-smiley-faces.service", () => {
			return {
				useCountTheSmileyFacesService: () => mockCountTheSmileyFacesService,
			};
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Should be rendered properly", () => {
		const wrapper = shallowMount(CountTheSmileyFacesView);
		expect(wrapper).toBeDefined();
	});

	it("Should be display valid result when input changed", async () => {
		let mockInput = ":-) :-(";
		mockCountTheSmileyFacesService.find.mockImplementation(() => {
			return Promise.resolve(1);
		});

		const wrapper = shallowMount(CountTheSmileyFacesView);
		const input = wrapper.find<HTMLInputElement>("#count-the-smiley-faces-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#count-the-smiley-faces-result");
		expect(result.element.value).toEqual("1");

		mockInput = ":-/ :-(";
		mockCountTheSmileyFacesService.find.mockImplementation(() => {
			return Promise.resolve(0);
		});

		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		expect(result.element.value).toEqual("0");

		await input.setValue("");

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		expect(result.element.value).toEqual("");
	});

	it("Should be display error message from server", async () => {
		let mockInput = ":-) :-(";
		mockCountTheSmileyFacesService.find.mockImplementation(() => {
			return Promise.reject(new AxiosError("error", "500"));
		});

		const wrapper = shallowMount(CountTheSmileyFacesView);
		const input = wrapper.find<HTMLInputElement>("#count-the-smiley-faces-input");
		await input.setValue(mockInput);

		await vi.runAllTimersAsync();
		await wrapper.vm.$nextTick();

		const result = wrapper.find<HTMLInputElement>("#count-the-smiley-faces-result");
		expect(result.element.value).toEqual(`error`);
	});
});
