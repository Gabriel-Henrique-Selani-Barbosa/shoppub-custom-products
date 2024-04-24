<script setup lang="ts">
import { IStep, ETagType } from "@/models";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
import { getTextFont } from "@/utils/getTextFont";
import { getShadowTextColor } from "@/utils/getShadowTextColor";
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
const hasImage = ref<boolean>(false);
const width = props.width || 4.6;
const height = props.height || 1.1;
const tagType = ETagType.RectangularClothing;
const base64Image = ref<string>("");
const base64ImageNoBack = ref<string>("");
const base64ColorPalette = ref<string[]>([]);
const stringSpan_1 = ref<HTMLDivElement | null>(null);
const stringSpan_2 = ref<HTMLDivElement | null>(null);
const container_stringSpan_1 = ref<HTMLDivElement | null>(null);
const container_stringSpan_2 = ref<HTMLDivElement | null>(null);
const stringContainer = ref<HTMLDivElement | null>(null);
const tagItem = ref<HTMLDivElement | null>(null);
const scaleFactorDefault = 1.2;
const scaleFactor = ref<number>(scaleFactorDefault);
const isMobile = ref<boolean>(false);
const route = useRoute();

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
  const response = base64Image.value;
  hasImage.value = Boolean(response);
  if (hasImage.value) return `url(${response})`;
  return getBackgroundColor(field);
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
  nextTick(() => {
    const tagElement = tagItem.value;
    if (!tagElement) return;
    if (window.innerWidth < 960 && !props.noScale) {
      const { scale } = getScale(
        builder.$state.devicePixelRatio,
        { unit: "cm", width, height },
        {
          unit: "pixel",
          height: window.innerHeight * .33 - 50,
          width: window.innerWidth - 40,
        }
      );
      scaleFactor.value = scale;
      isMobile.value = true;
      return;
    }
    isMobile.value = false;
    scaleFactor.value = scaleFactorDefault;
    tagElement.style.height = `auto`;
    tagElement.style.transformOrigin = `inherit`;
    tagElement.style.scale = `1`;
    tagElement.style.marginLeft = `0`;
  });
}
</script>

<template>
  <div class="tag-item" ref="tagItem">
    <div class="tag" ref="stringContainer" :style="{
      marginTop: '20px',
      marginLeft: '25px',
      position: 'relative',
      background: getBackgound(props.field),
      width: `${width * scaleFactor}cm`,
      height: `${height * scaleFactor}cm`,
      fontFamily: getTextFont(props.field).familyName,
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
      <div :style="{ width: `${width * scaleFactor}cm`, maxHeight: `${height * scaleFactor}cm`, display: 'flex' }">
        <div :style="{
          width: '100%',
          alignSelf: 'center',
          display: 'grid',
          maxHeight: `${height * scaleFactor}cm`,
          paddingLeft: hasImage ? '3rem' : 0,
        }">
          <div ref="container_stringSpan_1" v-if="getText(props.field, 0, [EItemType.text])" :style="{
            width: '100%',
            overflow: 'hidden',
          }">
            <span class="tag-text string-container" ref="stringSpan_1" :style="{
              color: getTextColor(props.field),
              textShadow: `${textShadow(
                builder,
                getTextColor(props.field),
                getBackgound(props.field),
                base64ColorPalette,
                hasImage,
                getShadowTextColor(props.field)
              )}`,
            }">
              {{ getText(props.field, 0, [EItemType.text]) }}
            </span>
          </div>
          <div ref="container_stringSpan_2" v-if="getText(props.field, 1, [EItemType.text])" :style="{
            width: '100%',
            overflow: 'hidden',
          }">
            <span class="tag-text string-container" ref="stringSpan_2" :style="{
              color: getTextColor(props.field),
              textShadow: `${textShadow(
                builder,
                getTextColor(props.field),
                getBackgound(props.field),
                base64ColorPalette,
                hasImage,
                getShadowTextColor(props.field)
              )}`,
            }">
              {{ getText(props.field, 1, [EItemType.text]) }}
            </span>
          </div>
        </div>
        <div v-if="base64ImageNoBack" :style="{
          height: `${height * 0.7 * scaleFactor}cm`,
          paddingRight: '15px',
        }">
          <img :style="{
            width: 'auto',
            height: 'inherit',
          }" :src="base64ImageNoBack" alt="Draw" />
        </div>
      </div>
    </div>
    <div class="tag-description" :style="{ marginLeft: '25px' }">
      <p class="tag-title m-0">Etiqueta Para Roupas</p>
      <p class="tag-title m-0 tag-dimensions">
        {{ getDimension(width) }} x {{ getDimension(height) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-item {
  position: relative;
  width: max-content;
  text-align: left;
}

.tag-description {
  display: inline-block;
}

.tag-title {
  font-size: 12px;
}

.tag-text {
  user-select: none;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
  overflow: hidden;
  vertical-align: super;
}

.tag {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  background-size: 100% 100% !important;
  background-position: center !important;
  white-space: nowrap;
  display: grid;
  border-radius: 10px;
  align-content: center;
  text-align: center;
  grid-auto-rows: min-content;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}

.string-container {
  overflow: hidden;
  white-space: nowrap;
}
</style>
