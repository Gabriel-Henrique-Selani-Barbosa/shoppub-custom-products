<script setup lang="ts">
interface StepItemProps {
    childrens?: any
}

const props = defineProps<StepItemProps>();
</script>

<template>
    <div class="start">
        <p class="presentation-text-label">{{ childrens.name }}:</p>
        <div class="presentation-group">
            <span class="presentation-value">
                {{ childrens.config.options.find((item: any) => item.selected).name }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.start {
    padding: 1rem;
    padding-top: 0rem !important;
}

.presentation-text-label {
    margin-bottom: 5px;
}

.preview-color {
    width: 45px;
    border-radius: 5px;
}

.presentation-group {
    display: flex;
}

.presentation-value {
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
    color: darken(#70cacd, 10);
}
</style>