<script setup lang="ts">
import { IStep, IProduct } from "@/models";
const builder = useBuilderState();
const app = useAppState();

interface StepItemProps {
  fullPreviewImage?: Promise<string>;
}

const props = defineProps<StepItemProps>();
const previewImage = ref<string>();

onMounted(() => {
  props.fullPreviewImage?.then((item) => {
    previewImage.value = item;
  });
});
function getViews(product: IProduct<any, any>, steps: IStep<any, any, any>[]) {
  if (
    steps
      .find((item) => item.type === "image")
      ?.children?.find((item) => item.category === "image-upload")?.config.selected
  ) {
    return product?.views_custom_image;
  }
  return product?.views;
}
</script>

<template>
  <div class="finish">
    <UiText variant="h3">Confirmar informações</UiText>
    <UiText>Por favor, confirme as informações a serem enviadas.</UiText>
    <UiText class="alert"
      >*Ao concluir a montagem você confirma que forneceu os dados corretos e está de
      acordo com o layout das etiquetas.</UiText
    >

    <template v-if="builder.steps?.length">
      <StepPresentationRender
        v-for="(step, i) in builder.steps"
        :key="i"
        :step="step"
        :index="i"
      />
      <UiText variant="h5">Etiquetas: </UiText>
      <p
        v-for="(productType, i) in getViews(app.$state.data?.product as IProduct<any, any>, builder.steps)"
      >
        {{ ` - ${productType.name}` }}
      </p>
      <template v-if="Boolean(previewImage)">
        <UiText variant="h5">Preview: </UiText>
        <img
          :src="`${previewImage}`"
          alt="preview"
          :style="{ width: '100%', height: 'auto' }"
        />
        <a class="button" :href="previewImage" :download="'preview.png'" v-if="Boolean(previewImage)"
          >Baixar</a
        >
        <StepNavButton class="button-next" :style="{ marginTop: '15px' }" @click="builder.finishMethod">
          Finalizar Compra
          <FontAwesomeIcon icon="check" />
        </StepNavButton>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.finish {
  padding: 1rem;
  padding-top: 0rem !important;
  margin-top: calc(35px + 1rem);
  height: calc(100vh - 36px);
  overflow: auto;

  .alert {
    padding: 15px;
    background-color: lighten(#70cacd, 20);
  }

  .button {
    color: #fff;
    background: #4abcc0;
    border: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.7rem;
    flex: 1;
    text-transform: uppercase;
    padding: 0.25em 2em;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 0.5rem;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
