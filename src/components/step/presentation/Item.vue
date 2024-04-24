<script setup lang="ts">

interface StepItemProps {
    item: any
    index: number
}

const props = defineProps<StepItemProps>();
</script>

<template>
    <template v-if="item.type === 'color-grid'">
        <StepPresentationColorGrid :childrens="item" />
    </template>
    <template v-if="item.type === 'font-selector'">
        <StepPresentationFontSelector :childrens="item" />
    </template>
    <template v-if="item.type === 'image-category'">
        <StepPresentationImageCategory :childrens="item" />
    </template>
    <template v-if="item.type === 'text-small'">
        <StepPresentationTextSmall :childrens="item" />
    </template>
    <template v-if="item.type === 'radio'">
        <StepPresentationRadio :childrens="item" />
    </template>
</template>
