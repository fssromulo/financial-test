<template>
    <div class="card-component-wrapper">
        <v-row>
            <v-col cols="12">
                <h3>{{ title }}</h3>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <br />
        <v-row class="mb-2" v-if="Object.keys(list).length > 0">
            <v-col v-for="(item, index) in list" :key="index" cols="4" sm="6">
                <v-card>
                    <v-card-item>
                        <template v-slot:subtitle>
                            {{ item.name }}
                            <v-icon :icon="getIcon(item.variation)" :color="getIconVariationColor(item.variation)" />
                        </template>
                    </v-card-item>

                    <v-card-text class="py-0">
                        <v-row align="center">
                            <v-col sm="6">
                                {{ index }}
                            </v-col>

                            <v-col sm="6" class="text-right">
                                <span :class="getVariationColor(item.variation)">{{ item.variation }}</span>
                                <v-icon :icon="getIcon(item.variation)" :color="getIconVariationColor(item.variation)" />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn style="font-size: 10px;" :exact="true"
                            :to="`/discovery/${title.toLocaleLowerCase()}/${index}`">
                            More
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <EmptyState content="Nothing to show"></EmptyState>
        </v-row>
    </div>
</template>

<script lang="ts">
import EmptyState from '@/components/EmptyState.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        EmptyState
    },
    name: 'CardComponent',
    props: {
        title: { type: String, required: true, default: '' },
        list: { type: Object, required: true, default: () => ({}) },
    },
    setup() {

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
            getIcon,
            getIconVariationColor,
            getVariationColor,
        }
    },

});
</script>

<style scoped>
.text-positive-variation {
    color: green;
}

.text-negative-variation {
    color: red;
}
</style>