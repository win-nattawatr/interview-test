<template>
	<div class="find-the-odd-int-view__container">
		<h3>Find The Odd Int</h3>
		<div class="find-the-odd-int__container">
			<div>
				<label for="find-the-odd-int-input" class="form-label">Input</label>
				<input
					v-model="findTheOddIntInput"
					type="text"
					class="form-control"
					id="find-the-odd-int-input"
					placeholder="Enter the number list, split with space (ex. 1 2 3)"
				/>
			</div>
			<div>
				<label for="find-the-odd-int-result" class="form-label">Result</label>
				<textarea
					v-model="findTheOddIntResult"
					class="form-control no-resize"
					id="find-the-odd-int-result"
					rows="4"
					readonly
				></textarea>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { Subject, Subscription, catchError, debounceTime, defer, of, switchMap } from "rxjs";
import { useFindTheOddIntService } from "../../composables/find-the-odd-int.service";
import { AxiosError } from "axios";

const findTheOddIntService = useFindTheOddIntService();

const findTheOddIntInput = ref<string>("");
const findTheOddIntResult = ref<string>("");

const transformInput = (input: string) => {
	return input
		.trim()
		.split(" ")
		.filter((item) => item)
		.map((item) => {
			const number = parseInt(item);
			return isNaN(number) ? item : number;
		});
};

const _fetchResult$ = new Subject<string>();
const fetchResult$ = _fetchResult$.asObservable().pipe(
	debounceTime(1000),
	switchMap((input) => {
		if (input) {
			const transformedInput = transformInput(input);
			if (transformedInput.some((item) => typeof item !== "number")) {
				return of(
					`[${transformedInput.filter((item) => typeof item !== "number").join(", ")}] is not a number`
				);
			}

			return defer(() => findTheOddIntService.find(transformedInput as number[])).pipe(
				catchError((error: AxiosError<Error>) =>
					of(error.response ? error.response.data.message : error.message)
				)
			);
		}

		return of(null);
	})
);

watch(findTheOddIntInput, (value) => {
	_fetchResult$.next(value);
});

let fetchResultSubscription: Subscription;
onMounted(() => {
	fetchResultSubscription = fetchResult$.subscribe({
		next: (result) => {
			findTheOddIntResult.value = result ? result.toString() : "";
		},
	});
});

onUnmounted(() => {
	fetchResultSubscription.unsubscribe();
});
</script>
<style scoped lang="css">
.find-the-odd-int-view__container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.5rem;
	gap: 1rem 0;
}

.find-the-odd-int__container {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 992px;
	gap: 1rem 0;
}
</style>
