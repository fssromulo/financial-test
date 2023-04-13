<template>
	<TheHeader v-if="shouldShowHeader" />
	<v-container class="bg-surface-variant">
		<v-col cols="12">
			<RouterView />
		</v-col>
	</v-container>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const shouldShowHeader = computed((): boolean => {
	return store.getters.isAuthenticated ?? false;
});


store.dispatch('autoLogin');


</script>
