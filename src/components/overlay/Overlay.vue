<template>
    <v-overlay :model-value="modelValue" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
    loading: boolean;
}>();

const modelComponent = ref(props.loading)

const modelValue = computed({
    get() {
        return modelComponent.value
    },
    set(val) {
        modelComponent.value = val
    }
})

</script>
