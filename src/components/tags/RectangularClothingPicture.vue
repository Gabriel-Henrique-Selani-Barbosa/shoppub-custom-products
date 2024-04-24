<script setup lang="ts">
import { ETagType, IStep } from "@/models";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
import { getTextFont } from "@/utils/getTextFont";
import { getShadowTextColor } from "@/utils/getShadowTextColor";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { EItemType } from "@/models/item/IItem";
import { getScale } from "@/utils/getScale";

const builder = useBuilderState();

interface ITag {
  field: IStep<any, any, any>[];
  noScale?: boolean;
  width?: number;
  height?: number;
}

const props = defineProps<ITag>();
const width = props.width || 4.7;
const height = props.height || 1.4;
const stringSpan_1 = ref<HTMLDivElement | null>(null);
const stringSpan_2 = ref<HTMLDivElement | null>(null);
const container_stringSpan_1 = ref<HTMLDivElement | null>(null);
const container_stringSpan_2 = ref<HTMLDivElement | null>(null);
const stringContainer = ref<HTMLDivElement | null>(null);
const tagItem = ref<HTMLDivElement | null>(null);
const tagType = ETagType.RectangularClothingPicture;
const scaleFactorDefault = 1.5;
const scaleFactor = ref<number>(scaleFactorDefault);
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
const imagesTagsObject = computed(
  () =>
    ensure(props.field)
      .find((item) => item.type == "image")
      ?.children?.find((row) => row.config.selected)?.config?.children?.[0]
);
function getBackgound(field: IStep<any, any, any>[], images: any) {
  let response: string | undefined;
  response = images?.config?.base64_cropped;
  if (response) response = `url(${response})`;
  if (!response) response = getBackgroundColor(field);
  return response;
}
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
      return;
    }
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
    <div class="group" ref="stringContainer" :style="{
      marginTop: '20px',
      marginLeft: '25px',
      position: 'relative',
      width: `${width * scaleFactor}cm`,
      height: `${height * scaleFactor}cm`,
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
        <div class="vertical-line"/>
        <span class="text-quote">{{ `${height}cm` }}</span>
        <div class="vertical-line"/>
        <div class="horizontal-line" />
      </div>
      <div class="tag tag-round" :style="{
        background: getBackgound(props.field, imagesTagsObject),
        border: `1px solid ${getBackgroundColor(props.field)}`,
        fontFamily: getTextFont(props.field).familyName,
        width: `${height * scaleFactor}cm`,
        height: `${height * scaleFactor}cm`,
      }" />
      <div class="tag" :style="{
        fontFamily: getTextFont(props.field).familyName,
        background: getBackgroundColor(props.field),
        width: `${(width - height / 2) * scaleFactor}cm`,
        height: `${height * 0.8 * scaleFactor}cm`,
        display: 'grid',
      }">
        <div ref="container_stringSpan_1" v-if="getText(props.field, 0, [EItemType.text])" :style="{
          overflow: 'hidden',
          width: `calc(100% - ${27 * scaleFactor}px)`,
          marginLeft: `${27 * scaleFactor}px`,
        }">
          <span class="tag-text string-container" ref="stringSpan_1" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
          }">
            {{ getText(props.field, 0, [EItemType.text]) }}
          </span>
        </div>
        <div ref="container_stringSpan_2" :style="{
          width: `calc(100% - ${27 * scaleFactor}px)`,
          marginLeft: `${27 * scaleFactor}px`,
          overflow: 'hidden',
        }" v-if="getText(props.field, 1, [EItemType.text])">
          <span class="tag-text string-container" ref="stringSpan_2" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
          }">
            {{ getText(props.field, 1, [EItemType.text]) }}
          </span>
        </div>
      </div>
    </div>
    <div class="tag-description" :style="{ marginLeft: '25px' }">
      <p class="tag-title m-0">Etiqueta Para Roupas Com Foto</p>
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

.group {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  width: fit-content;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 0fr);
  grid-template-rows: 1fr;
  grid-row-gap: 0px;
  margin-bottom: 4px;
  position: relative;
  justify-content: end;
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
}

.tag {
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
  align-self: center;
}

.tag-round {
  border-radius: 50%;
  position: absolute;
  left: 0;
}

.string-container {
  overflow: hidden;
  white-space: nowrap;
}
</style>
