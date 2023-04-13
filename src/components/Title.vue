<template>
    <div class="title-wrapper">
        <v-row>
            <v-col cols="12" class="mb-3 mt-8">
                <span class="title-content">{{ content }}</span>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        content: { type: String, required: true, default: '' },
    },
});
</script>

<style scoped>
.title-content {
    font-size: 25px;
    font-weight: 900;
}
</style>
