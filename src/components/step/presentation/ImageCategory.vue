<script setup lang="ts">
import { IItemImage, IItemImageGroup } from "@/models";
const builder = useBuilderState();

interface StepItemProps {
  childrens?: any;
}

const props = defineProps<StepItemProps>();

function isImageGroup(childrens: (IItemImageGroup | IItemImage)[]) {
  return childrens.every((row) => row.type === "image");
}
function getImageGroups(field: IItemImageGroup): IItemImageGroup[] {
  const response: any[] = [];
  if (field?.children?.length && isImageGroup(field.children as IItemImageGroup[])) {
    response.push(field);
  } else {
    field?.children?.forEach((item) =>
      getImageGroups(item as IItemImageGroup).forEach((row) => response.push(row))
    );
  }
  return response;
}
const imagesTagsObject = computed(() => builder.imageSelected);
</script>

<template>
  <div class="start" v-if="childrens?.config?.selected">
    <p class="presentation-text-label">Categoria:</p>
    <div class="start px-0">
      <span class="presentation-value">{{ childrens.category_label }}</span>
    </div>
    <p class="presentation-text-label">Imagem/Tema:</p>
    <template v-if="Boolean(childrens.category == 'image-upload')">
      <div :style="{ marginBottom: '0.6em' }">
        <div class="presentation-image">
          <img class="image-presentation-tag" :src="`${childrens.config?.children?.[0]?.config?.base64_cropped}`" alt="preview-image" />
        </div>
        <span class="presentation-value">Foto</span>
      </div>
    </template>
    <template v-if="Boolean(imagesTagsObject?.config?.url)">
      <div class="presentation-image">
        <img class="image-presentation-tag" :src="`${imagesTagsObject?.config?.url}`" alt="preview-image" />
      </div>
      <span class="presentation-value">Tema Selecionado</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.start {
  padding: 1rem;
  padding-top: 0rem !important;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.presentation-text-label {
  margin-bottom: 5px;
}

.presentation-image {
  width: 100%;
  max-width: 200px;
  height: 60px;
  margin-bottom: 2px;
}

.image-presentation-tag {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.presentation-value {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  color: darken(#70cacd, 10);
}
</style>
