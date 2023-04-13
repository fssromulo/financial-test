<template>
	<div>
		<CardComponent key="currencies-list-card-component" title="Currencies" :list="currenciesList" />
		<CardComponent key="stocks-list-card-component" title="Stocks" :list="stocksList" />
		<Overlay v-model="isLoading" :loading="isLoading"></Overlay>
	</div>
</template>

<script lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import Overlay from "@/components/overlay/Overlay.vue";
import { computed, defineComponent, onMounted, ref, type Ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	components: {
		CardComponent, Overlay
	},
	setup() {

		const isLoading: Ref<boolean> = ref(false);
		const list: Ref<any[]> = ref([]);

		const store = useStore();

		const searchFinancialData = async (): Promise<any> => {
			isLoading.value = true;

			const responseData = await store.dispatch('searchFinancialData');
			isLoading.value = false;
			return responseData.results;
		}

		onMounted(async () => {
			list.value = await searchFinancialData();
		});

		const currenciesList = computed((): any[] => {
			return list.value?.currencies ?? [];
		});

		const stocksList = computed((): any[] => {
			return list.value?.stocks ?? [];
		});

		function getIcon(variation: number): string {
			return variation > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
		}

		function getIconVariationColor(variation: number): string {
			return variation > 0 ? 'green' : 'red'
		}

		function getVariationColor(variation: number): string {
			return variation > 0 ? 'text-positive-variation' : 'text-negative-variation'
		}

		return {
			isLoading,
			currenciesList,
			stocksList,
			list,
			getIcon,
			getIconVariationColor,
			getVariationColor
		}
	},

});
</script>

<style scoped></style>