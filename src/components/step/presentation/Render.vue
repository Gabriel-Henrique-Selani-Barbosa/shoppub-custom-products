<script setup lang="ts">
import { IStep } from "@/models";
const builder = useBuilderState();

interface StepItemProps {
  step: IStep<any, any, any>;
  index: number;
}

const props = defineProps<StepItemProps>();

const imagesTagsObject = computed(() =>
  [
    ...(builder.imagesList ?? []),
    (
      builder.steps
        .find((i) => i.type === "image")
        ?.children?.find((i) => i.category === "image-upload")
    ) || ({} as any),
  ].find((row) => row?.config?.selected)
);
</script>

<template>
  <div class="mb-2" v-if="step.type !== 'image' || Boolean(imagesTagsObject)">
    <UiText variant="h5">{{ step.label }}:</UiText>
    <template v-if="step.children?.length">
      <StepPresentationItem
        v-for="(item, i) in step.children"
        :key="i"
        :item="item"
        :index="i"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.mb-2 {
  margin-bottom: 2em;
}
</style>
