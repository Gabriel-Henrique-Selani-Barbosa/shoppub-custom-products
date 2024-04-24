<script setup lang="ts">
import Logo from "@/assets/img/logo.png";
import CustomProducts from "@/http/custom-products";
import TagRenderVue from "@/components/tags/Render.vue";
import { IStep, IProduct } from "@/models";
import html2canvas from "html2canvas";
import { toast, ToastType } from "vue3-toastify";
import { getImageGroups } from "@/utils/getImageGroups";
import { parserSteps } from "@/utils/parsePost";
import { parseImagesStep } from "@/utils/parseImagesStep";
import { orderViews } from "@/utils/orderViews";
import { IProductType } from "@/models/product/IProduct";
import { IStepType } from "@/models/step/IStep";

const app = useAppState();
const builder = useBuilderState();
const getCustomProductsConfig = CustomProducts.GetCustomProducts();
const route = useRoute();
const mobilePreviewDiv = ref(null);
const mobilePreviewDivCommon = ref(null);
const previewDiv = ref<HTMLDivElement | null>(null);
const notify = (message: string, type: ToastType = "default") => {
  toast(message, {
    autoClose: 3000,
    theme: "colored",
    type,
  });
};
onMounted(() => {
  getCustomProductsConfig.get(route.params.id as string);
  const { data } = getCustomProductsConfig;
  app.$state.data = data;
  builder.$state.product = app.$state.data?.product ?? null;
  builder.$state.steps =
    app.$state.data?.steps?.map((item) => ({
      ...item,
      config: { ...item.config, checked: true },
    })) || [];
  builder.$state.imagesList = app.$state.data?.steps
    ?.find((item) => item.type == "image")
    ?.children?.map((row) => getImageGroups(row))
    ?.flat(1);
  builder.$state.step = 0;
  builder.finishMethod = finishOrder;
  builder.$state.windowMobilePreviewWidth = window.innerWidth;
  builder.$state.windowMobilePreviewHeight = window.innerHeight * 0.33;
  builder.$state.devicePixelRatio = window.devicePixelRatio;
});
function getViews(product: IProduct<any, any>, steps: IStep<any, any, any>[]) {
  if (
    steps
      .find((item) => item.type === "image")
      ?.children?.find((item) => item.category === "image-upload")?.config.selected
  ) {
    return orderViews(product?.views_custom_image);
  }
  return orderViews(product?.views);
}
watch(
  [
    CustomProducts.GetCustomProductsRefs().data,
    CustomProducts.GetCustomProductsRefs().error,
  ],
  () => {
    getCustomProductsConfig.loading = true;
    const { data } = getCustomProductsConfig;
    app.$state.data = data;
    builder.$state.product = app.$state.data?.product || null;
    builder.$state.steps = app.$state.data?.steps || [];
    builder.$state.imagesList = app.$state.data?.steps
      ?.find((item) => item.type == "image")
      ?.children?.map((row) => getImageGroups(row))
      ?.flat(1);
    builder.$state.step = 0;
    builder.$state.windowMobilePreviewWidth = window.innerWidth;
    builder.$state.windowMobilePreviewHeight = window.innerHeight * 0.33;
    builder.$state.devicePixelRatio = window.devicePixelRatio;
    const stepImage = builder.$state.steps.find((item) => item.type === "image");
    const indexImageStep = builder.$state.steps.findIndex((item) => item.type === "image");
    const finded = builder.$state.imagesList?.find(item => item.name === route.query?.name && item.category === route.query?.category)
    if (finded) {
      builder.setImageSelected(finded)
    }
    if (stepImage) {
      builder.$state.steps[indexImageStep] = parseImagesStep(
        stepImage,
        Boolean(app.$state.data?.product?.views_custom_image?.length),
        builder.product?.only_single_colors
      );
    }
    const stepQuantity = builder.$state.steps.find((item) => item.type === "quantity");
    const indexQuantityStep = builder.$state.steps.findIndex((item) => item.type === "quantity");
    const productOptions = builder.$state.product?.children?.map((item, idx) => ({
      ...item,
      selected: idx === 0,
      value: +item.main_attribute_value,
      label: `${item.main_attribute_value} Etiquetas (R$ ${String(item.price).replace('.', ',')})`
    }))
    if (stepQuantity) {
      builder.$state.steps[indexQuantityStep] = {
        ...stepQuantity,
        children: [{
          ...stepQuantity.children?.[0],
          type: !productOptions ? 'text-info' : stepQuantity.children?.[0]?.type,
          infos: [...stepQuantity.children?.[0]?.label.replace(/[-\/]/g, ';').split(';') as [], !productOptions?.length ?
            `R$ ${String(builder.$state.product?.price).replace('.', ',')}` : null],
          config: {
            ...stepQuantity.children?.[0].config,
            options: productOptions || [],
          }
        }]
      }
    }
    getCustomProductsConfig.loading = false;
  }
);
watch(() => builder.imageSelected, () => {
  window.parent.postMessage(
    { eventName: "product-builder-image-selected", data: JSON.stringify(builder.imageSelected) },
    "*"
  );
})
const captureScreenshot = async (divElement: HTMLDivElement | null): Promise<string> => {
  if (!divElement) return "";
  let dataUrl = "";
  try {
    const options = {
      useCORS: true,
      windowWidth: 1920,
      windowHeight: 1080,
      onclone: async (_document: Document, element: HTMLElement) => {
        element.style.display = 'inherit';
        element.style.maxWidth = `min-content`;
        element.classList.add("print-screen-preview");
        element.style.height = `max-content`;
        element.style.minHeight = `max-content`;
        const canvas = await html2canvas(element);
        dataUrl = canvas.toDataURL();
      },
    };
    await html2canvas(divElement, options);
  } catch (error) {
    console.error("Ocorreu um erro ao capturar a tela:", error);
  }
  return dataUrl;
};
function getProductId(product: IProduct<IProductType, any>, steps: Array<IStep<IStepType, any, any>>): string {
  const stepQuantity = steps.find((item) => item.type === "quantity");
  if (!stepQuantity?.children?.[0].config.options.length) return String(product.id)
  return stepQuantity.children?.[0].config.options.find((item: any) => item.selected)?.id || ''
}
async function finishOrder() {
  if (builder.$state.product) {
    if (builder.$state.steps.some((step) => !step.config.checked)) {
      notify("Um ou mais campo(s) obrigatórios não foram definidos.", "error");
      return;
    }
    const previewBase64 = await captureScreenshot(previewDiv.value);
    const id = getProductId(builder.$state.product, builder.$state.steps)
    const payload = {
      product: +id,
      quantity: 1,
      replace_quantity: false,
      is_buying_by_measure: false,
      addon_values: "[]",
      as_free: false,
      customization: {
        image_preview: previewBase64,
        steps: parserSteps(builder.$state.steps),
      },
    };
    notify("Produto adicionado ao carrinho com sucesso!", "success");
    console.log(payload)
    window.parent.postMessage(
      { eventName: "product-builder-finish-order", data: JSON.stringify(payload) },
      "*"
    );
  }
}

const slides = (product: IProduct<any, any>, steps: IStep<any, any, any>[]) => {
  const common = (product?.views ?? [])?.map((productType, i) => {
    return {
      component: TagRenderVue,
      props: {
        key: i,
        steps: builder.steps,
        productViews: productType,
      },
    };
  });
  const custom = (product?.views_custom_image || [])?.map((productType, i) => {
    return {
      component: TagRenderVue,
      props: {
        key: i,
        steps: builder.steps,
        productViews: productType,
      },
    };
  });

  return {
    common,
    custom,
    showCustom:
      Boolean(
        steps.find((item) => item.type === "image")
          ?.children?.find((item) => item.category === "image-upload")?.config.selected
      ) || false,
  };
};
</script>

<template>
  <div class="builder">
    <div class="builder__side">
      <div class="builder__logo">
        <img :src="Logo" alt="Logo" class="logo" />
      </div>
      <StepNavMain :steps="(builder.steps as IStep<any, any, any>[])" :currentStep="builder.step" />
    </div>
    <div
      v-if="slides(app.$state.data?.product as IProduct<any, any>, builder.steps).showCustom && slides(app.$state.data?.product as IProduct<any, any>, builder.steps).custom.length"
      class="builder__mobile_preview" ref="mobilePreviewDiv">
      <UiSplideSlider :slides="slides(app.$state.data?.product as IProduct<any, any>, builder.steps).custom"
        :parentRef="mobilePreviewDiv" />
    </div>
    <div
      v-if="!slides(app.$state.data?.product as IProduct<any, any>, builder.steps).showCustom && slides(app.$state.data?.product as IProduct<any, any>, builder.steps).common.length"
      class="builder__mobile_preview" ref="mobilePreviewDivCommon">
      <UiSplideSlider :slides="slides(app.$state.data?.product as IProduct<any, any>, builder.steps).common"
        :parentRef="mobilePreviewDivCommon" />
    </div>
    <div class="builder__main">
      <StepFinish v-if="builder.isFinishPage" :fullPreviewImage="captureScreenshot(previewDiv)" />
      <div class="builder__step__main" v-if="!builder.isFinishPage && !builder.isStartPage">
        <StepRender v-for="(step, i) in builder.steps" :key="i" :step="step" :index="i" :active="builder.step === i" />
      </div>
      <StepNavBody />
    </div>
    <div class="builder__preview" ref="previewDiv">
      <div class="tags__preview__area">
        <TagsRender v-for="(productType, i) in getViews(app.$state.data?.product as IProduct<any, any>, builder.steps)"
          :key="i" :steps="builder.steps" :productViews="productType" :noScale="true" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.builder {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }

  .display_flex {
    display: flex !important;
  }

  &__logo {
    margin: auto;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__step__main {
    height: calc(100vh - 200px);
    overflow: auto;
    margin-top: calc(36px);

    @media (min-width: 960px) {
      height: calc(100vh);
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }

  &__side {
    display: none;
    background: #eeeeee;

    @media (min-width: 960px) {
      max-width: 230px;
      min-height: 100vh;
      display: block;
      flex: 1 0 230px;
    }
  }

  &__main {
    background: #fff;
    width: 100%;
    position: relative;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.2);
    clip-path: inset(0px -15px 0px 0px);

    @media (min-width: 960px) {
      max-width: 400px;
      min-height: 100vh;
      flex: 1 0 400px;
    }
  }

  &__preview {
    height: 0;
    overflow: auto;
    background-color: rgb(243, 244, 246) !important;

    .tags__preview__area {
      display: flex;
      flex-wrap: wrap;
      padding: 0 1.5rem;
      gap: 0 1rem;
    }

    @media (min-width: 960px) {
      width: auto;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      flex: auto;
    }
  }

  &__mobile_preview {
    min-height: 33vh;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;

    @media (min-width: 960px) {
      display: none;
    }
  }

  .__backgound_dark {
    background-color: rgb(243, 244, 246) !important;
  }
}
</style>
