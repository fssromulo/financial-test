<template>
    <div>
        <v-alert icon="fas fa-info" :text="content" type="warning"></v-alert>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'EmptyState',
    props: {
        content: { type: String, required: true, default: 'No content to show' },
    },
});
</script>