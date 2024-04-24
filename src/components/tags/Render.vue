<script setup lang="ts">
import { IStep, IProductView } from "@/models";

interface TagsRendererProps {
  productViews: IProductView<any>;
  noScale: boolean;
  steps: IStep<any, any, any>[];
}

const props = defineProps<TagsRendererProps>();
</script>

<template>
  <div class="tags">
    <TagsItem :productView="productViews" :steps="steps" :noScale="noScale" />
  </div>
</template>

<style lang="scss" scoped>
.tags {
  max-width: 100%;
  align-self: center;
  @media (max-width: 960px) {
    overflow: hidden;
    text-align: -webkit-center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
