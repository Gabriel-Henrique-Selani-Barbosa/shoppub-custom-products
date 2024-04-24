<script setup lang="ts">
import { IStep, ETagType } from "@/models";
import ShoesTagClip from "@/assets/tags/template-shoes-tag.vue";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
import { getShadowTextColor } from "@/utils/getShadowTextColor";
import { getTextFont } from "@/utils/getTextFont";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { EItemType } from "@/models/item/IItem";
import { getScale } from "@/utils/getScale";
import { handleImageUpdate } from "@/utils/handleImageUpdate";

const builder = useBuilderState();

interface ITag {
  field: IStep<any, any, any>[];
  noScale?: boolean;
  width?: number;
  height?: number;
}

const props = defineProps<ITag>();
const width = props.width || 3.6;
const height = props.height || 3.6;
const route = useRoute();
const tagType = ETagType.ShoesTag;
const base64Image = ref<string>("");
const base64ImageNoBack = ref<string>("");
const base64ColorPalette = ref<string[]>([]);
const stringSpan_1 = ref<HTMLDivElement | null>(null);
const stringSpan_2 = ref<HTMLDivElement | null>(null);
const container_stringSpan_1 = ref<HTMLDivElement | null>(null);
const container_stringSpan_2 = ref<HTMLDivElement | null>(null);
const stringContainer = ref<HTMLDivElement | null>(null);
const tagItem = ref<HTMLDivElement | null>(null);
const hasImage = ref<boolean>(false);
const scaleFactorDefault = 1;
const scaleFactor = ref<number>(scaleFactorDefault);
const isMobile = ref<boolean>(false);

function getTextColor(field: IStep<any, any, any>[]) {
  return (
    field
      .find((item) => item.type == "font")
      ?.children?.find((item) => item.type == "color-grid")
      ?.config.options.find((item: any) => item.selected)?.value ?? "#000"
  );
}
function getDimension(value: number) {
  return `${String(value.toFixed(2)).replace(/\./g, ",")}cm`;
}
function getSecondSmall(): boolean {
  return (
    String(
      props.field
        .find((item) => item.type == "text")
        ?.children?.find((item) => item.type == "radio")
        ?.config?.options.find((item: any) => item.selected)?.value
    ) == "true"
  );
}

function getBackgound(field: IStep<any, any, any>[]) {
  const response: { fillBackground: string; urlImage?: string } = {
    fillBackground: getBackgroundColor(field),
    urlImage: base64Image.value,
  };
  return response;
}
watch(
  () => builder.imageSelected,
  async () => {
    const handleImage = await handleImageUpdate(builder.imageSelected, tagType);
    base64Image.value = handleImage.principal_image.base64Image;
    base64ColorPalette.value = handleImage.principal_image.base64ColorPalette;
    base64ImageNoBack.value = handleImage.principal_image.base64ImageNoBack;
  }
);
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
const handleResize = () => {
  clearTimeout(resizeTimeout!);
  resizeTimeout = setTimeout(() => {
    handleResizeFn();
  }, 300);
};
watch(() => builder.imageSelected, handleResize)
onMounted(() => {
  handleResizeFn();
  window.addEventListener("resize", handleResize);
  if (builder.imageSelected) {
    handleImageUpdate(builder.imageSelected, tagType).then((handleImage) => {
      base64Image.value = handleImage.principal_image.base64Image;
      base64ColorPalette.value = handleImage.principal_image.base64ColorPalette;
      base64ImageNoBack.value = handleImage.principal_image.base64ImageNoBack;
    });
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
const handleResizeFn = () => {
  getScaleFn();
  updateValue(
    getSpans().map((item) => getText(props.field, item.indexState, [EItemType.text])),
    []
  );
};
const getSpans = () => [
  {
    container: container_stringSpan_1.value,
    text: stringSpan_1.value,
    smallerText: 1,
    indexState: 0,
  },
  {
    container: container_stringSpan_2.value,
    text: stringSpan_2.value,
    smallerText: getSecondSmall() ? 0.6 : 1,
    indexState: 1,
  },
];
const updateValue = (novoValor: unknown[], valorAnterior: unknown[]): void => {
  if (novoValor.every((item) => !item)) return;
  const textCount = novoValor.filter((item) => item).length;
  const indexState = novoValor.findIndex(
    (item, index) => ![item].includes(valorAnterior[index]) && novoValor
  );
  const container = stringContainer.value;
  if (!container) return;
  if (!valorAnterior[indexState]) {
    novoValor.forEach((_, index) => {
      resizeFont(index, textCount, container.offsetHeight * 0.7);
    });
  } else {
    resizeFont(indexState, textCount, container.offsetHeight * 0.7);
  }
};
watch(
  () => getSpans().map((item) => getText(props.field, item.indexState, [EItemType.text])),
  (novoValor, valorAnterior) => {
    updateValue(novoValor, valorAnterior);
  }
);
function resizeFont(indexState: number, textCount: number, maxTextAreaHeight: number) {
  nextTick(() => {
    const fontSize = 24;
    const maxContainerHeight = maxTextAreaHeight / (textCount || 1);
    const newFontSizeHeight = Math.min(fontSize);
    const spanItem = getSpans().find((item) => item.indexState === indexState);
    if (spanItem?.container && spanItem.text) {
      spanItem.container.style.maxHeight = `${maxContainerHeight}px`;
      const fontSize = getComputedStyle(spanItem.text).fontSize;
      const scaleFactorText =
        (spanItem.container.offsetWidth * 0.95) / spanItem.text.offsetWidth;
      const vertialScaleFactorText = maxContainerHeight / spanItem.text.offsetHeight;
      const newSize = Math.min(
        parseFloat(fontSize) * scaleFactorText,
        parseFloat(fontSize) * vertialScaleFactorText,
        newFontSizeHeight * scaleFactor.value
      );
      spanItem.text.style.fontSize = `${newSize * spanItem.smallerText}px`;
    }
  });
}
function getScaleFn() {
  if (builder.$state.windowMobilePreviewWidth < 960) {
    const tagElement = tagItem.value;
    const { scale } = getScale(
      builder.$state.devicePixelRatio,
      { unit: "cm", width, height },
      {
        unit: "pixel",
        height: window.innerHeight * .33 - 50,
        width: builder.$state.windowMobilePreviewWidth,
      }
    );
    if (!tagElement) return;
    scaleFactor.value = scale;
    isMobile.value = true;
  }
  isMobile.value = false;
  scaleFactor.value = scaleFactorDefault;
}
</script>

<template>
  <div class="tag-item" ref="tagItem">
    <div class="shoes-group" :style="{
      marginTop: '20px',
      marginLeft: '25px',
      position: 'relative',
    }">
      <div class="horizontal-quote">
        <div class="vertical-line" />
        <div class="horizontal-line" />
        <span class="text-quote">{{ `${width}cm` }}</span>
        <div class="horizontal-line" />
        <div class="vertical-line" />
      </div>
      <div class="vertical-quote">
        <div class="horizontal-line" />
        <div class="vertical-line" />
        <span class="text-quote">{{ `${height}cm` }}</span>
        <div class="vertical-line" />
        <div class="horizontal-line" />
      </div>
      <ShoesTagClip :width="`${(width + 0.02) * scaleFactor}cm`" :height="`${height * scaleFactor}cm`"
        :fillBackground="getBackgound(props.field).fillBackground" :urlImage="getBackgound(props.field)?.urlImage" />
      <div v-if="base64ImageNoBack" :style="{
        position: 'absolute',
        width: '100%',
        paddingLeft: `${27 * scaleFactor}px`,
        paddingRight: `${27 * scaleFactor}px`,
        height: `${height * 0.48 * scaleFactor}cm`,
        textAlign: 'center',
        paddingTop: `${18 * scaleFactor}px`,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }">
        <div :style="{
          alignSelf: 'center',
          display: 'contents',
          maxWidth: '100%',
          maxHeight: '100%',
        }">
          <img :style="{
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'fit-content',
          }" :src="base64ImageNoBack" alt="Draw" />
        </div>
      </div>
      <div class="shoes-tag" ref="stringContainer" :style="{
        width: `${width * scaleFactor}cm`,
        height: `${height * 0.57 * scaleFactor}cm`,
        position: 'absolute',
        bottom: 0,
      }">
        <div ref="container_stringSpan_1" v-if="getText(props.field, 0, [EItemType.text])" :style="{
          width: '100%',
          overflow: 'hidden',
        }">
          <span class="shoes-tag-text string-container" ref="stringSpan_1" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            fontFamily: getTextFont(props.field).familyName,
          }">
            {{ getText(props.field, 0, [EItemType.text]) }}
          </span>
        </div>
        <div ref="container_stringSpan_2" v-if="getText(props.field, 1, [EItemType.text])" :style="{
          width: '100%',
          overflow: 'hidden',
        }">
          <span class="shoes-tag-text string-container" ref="stringSpan_2" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            fontFamily: getTextFont(props.field).familyName,
          }">
            {{ getText(props.field, 1, [EItemType.text]) }}
          </span>
        </div>
      </div>
    </div>
    <div class="tag-description" :style="{ marginLeft: '25px' }">
      <p class="tag-title m-0">Etiqueta Calçados</p>
      <p class="tag-title m-0 tag-dimensions">
        {{ getDimension(width) }} x {{ getDimension(height) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shoes-group-clip-path {
  mask-repeat: "no-repeat";
  background-size: 100% 100% !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

.string-container {
  overflow: hidden;
  white-space: nowrap;
}

.tag-item {
  position: relative;
  width: max-content;
}

.tag-description {
  display: inline-block;
}

.shoes-group {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  width: fit-content;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 0fr);
  grid-row-gap: 0px;
  margin-bottom: 4px;
  position: relative;
}

.tag-title {
  font-size: 12px;
}

.shoes-tag-text {
  user-select: none;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
  overflow: hidden;
  vertical-align: super;
}

.shoes-tag {
  background-size: 100% 100% !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-attachment: scroll !important;
  font-size: 1.6em;
  line-height: normal;
  white-space: nowrap;
  display: grid;
  border-radius: 10px;
  align-content: center;
  text-align: center;
  grid-auto-rows: min-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
}

.shoes-tag-round {
  border-radius: 50%;
}
</style>
