<template>
	<div class="permutations-view__container">
		<h3>Permutations</h3>
		<div class="permutations__container">
			<div>
				<label for="permutations-input" class="form-label">Input</label>
				<input
					v-model="permutationsInput"
					type="text"
					class="form-control"
					id="permutations-input"
					placeholder="Enter some text (ex. abc)"
				/>
			</div>
			<div>
				<label for="permutations-result" class="form-label">Result</label>
				<textarea
					v-model="permutationsResult"
					class="form-control no-resize"
					id="permutations-result"
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
import { usePermutationsService } from "../../composables/permutations.service";
import { AxiosError } from "axios";

const permutationsService = usePermutationsService();

const permutationsInput = ref<string>("");
const permutationsResult = ref<string>("");

const _fetchResult$ = new Subject<string>();
const fetchResult$ = _fetchResult$.asObservable().pipe(
	debounceTime(1000),
	switchMap((input) => {
		if (input)
			return defer(() => permutationsService.getPermutations(input)).pipe(
				catchError((error: AxiosError<Error>) =>
					of(error.response ? error.response.data.message : error.message)
				)
			);

		return of("");
	})
);

watch(permutationsInput, (value) => {
	_fetchResult$.next(value);
});

let fetchResultSubscription: Subscription;
onMounted(() => {
	fetchResultSubscription = fetchResult$.subscribe({
		next: (result) => {
			permutationsResult.value = Array.isArray(result) ? result.join(", ") : result;
		},
	});
});

onUnmounted(() => {
	fetchResultSubscription.unsubscribe();
});
</script>
<style scoped lang="css">
.permutations-view__container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.5rem;
	gap: 1rem 0;
}

.permutations__container {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 992px;
	gap: 1rem 0;
}
</style>
