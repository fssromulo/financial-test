<template>
    <div>
        <v-btn variant="text" color="primary" type="button" @click="goBack">
            &lt; Back
        </v-btn>
        <TitleComponent :content="`Details for ${itemRouterParam} - Purchase/Buy Price`"></TitleComponent>

        <Bar v-if="loadingChart && hasEnoughDataToShow" id="my-chart-id" :options="chartOptions" :data="chartData" />
        <div v-else> Nothing to show yet... Come back later...</div>
    </div>
</template>


<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TitleComponent from "../components/Title.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

enum FinancialType {
    'STOCKS' = 'stocks',
    'CURRENCIES' = 'currencies'
}

const store = useStore();
const route = useRoute();
const router = useRouter();

let loadingChart = ref(false);

const chartOptions = { responsive: true }

const itemRouterParam = route.params.item as string;
const typeRouterParam = route.params.type as string;

const colors = [
    "red",
    "teal",
    "green",
    "blue",
    "black",
    "indigo",
    "yellow",
    "gray",
    "purple",
    "pink",
];


function goBack(): void { router.back(); }

const hasEnoughDataToShow = computed((): boolean => {
    return chartData.datasets[0].data.length >= 1;
})

const chartData = {
    labels: [] as string[],
    datasets: [{
        label: itemRouterParam,
        backgroundColor: colors[Math.floor(Math.random() * (10))] ?? 0, // Random charts colors 
        data: [] as number[]
    }]
};

const cacheData = store.getters.getFinancialData ?? [];

onMounted(() => {
    cacheData.forEach((data: any) => {
        const convertLabel = new Date(data.baseDate as string).toLocaleString()
        chartData.labels.push(convertLabel);
        let dataValue = data[typeRouterParam][itemRouterParam].buy as number;
        if (typeRouterParam === FinancialType.STOCKS) {
            dataValue = data[typeRouterParam][itemRouterParam].points as number;
        }
        chartData.datasets[0].data.push(dataValue);
        chartData.datasets[0].label = itemRouterParam;
    })
    loadingChart.value = true;
});
</script>
