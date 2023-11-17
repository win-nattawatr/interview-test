<template>
	<div class="count-the-smiley-faces-view__container">
		<h3>Count the smiley faces!</h3>
		<div class="count-the-smiley-faces__container">
			<div>
				<label for="count-the-smiley-faces-input" class="form-label">Input</label>
				<input
					v-model="countTheSmileyFacesInput"
					type="text"
					class="form-control"
					id="count-the-smiley-faces-input"
					placeholder="Enter the number list, split with space (ex. 1 2 3)"
				/>
			</div>
			<div>
				<label for="count-the-smiley-faces-result" class="form-label">Result</label>
				<textarea
					v-model="countTheSmileyFacesResult"
					class="form-control no-resize"
					id="count-the-smiley-faces-result"
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
import { useCountTheSmileyFacesService } from "../../composables/count-the-smiley-faces.service";
import { AxiosError } from "axios";

const countTheSmileyFacesService = useCountTheSmileyFacesService();

const countTheSmileyFacesInput = ref<string>("");
const countTheSmileyFacesResult = ref<string>("");

const transformInput = (input: string) => {
	return input
		.trim()
		.split(" ")
		.filter((item) => item);
};

const _fetchResult$ = new Subject<string>();
const fetchResult$ = _fetchResult$.asObservable().pipe(
	debounceTime(1000),
	switchMap((input) => {
		if (input) {
			const transformedInput = transformInput(input);

			return defer(() => countTheSmileyFacesService.find(transformedInput)).pipe(
				catchError((error: AxiosError<Error>) =>
					of(error.response ? error.response.data.message : error.message)
				)
			);
		}

		return of(null);
	})
);

watch(countTheSmileyFacesInput, (value) => {
	_fetchResult$.next(value);
});

let fetchResultSubscription: Subscription;
onMounted(() => {
	fetchResultSubscription = fetchResult$.subscribe({
		next: (result) => {
			countTheSmileyFacesResult.value = countTheSmileyFacesInput.value ? (result ? result.toString() : "0") : "";
		},
	});
});

onUnmounted(() => {
	fetchResultSubscription.unsubscribe();
});
</script>
<style scoped lang="css">
.count-the-smiley-faces-view__container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.5rem;
	gap: 1rem 0;
}

.count-the-smiley-faces__container {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 992px;
	gap: 1rem 0;
}
</style>
