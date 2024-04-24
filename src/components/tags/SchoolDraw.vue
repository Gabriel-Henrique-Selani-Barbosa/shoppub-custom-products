<script setup lang="ts">
import { IStep, ETagType } from "@/models";
import SchoolDrawTagClip from "@/assets/tags/template-school.vue";
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
const width = props.width || 9.5;
const height = props.height || 4;
const tagType = ETagType.SchoolDraw;
const base64Image = ref<string>("");
const base64ImageNoBack = ref<string>("");
const base64ColorPalette = ref<string[]>([]);
const stringSpan_1 = ref<HTMLDivElement | null>(null);
const stringSpan_2 = ref<HTMLDivElement | null>(null);
const stringSpan_3 = ref<HTMLDivElement | null>(null);
const stringSpan_4 = ref<HTMLDivElement | null>(null);
const stringSpan_5 = ref<HTMLDivElement | null>(null);
const stringSpan_6 = ref<HTMLDivElement | null>(null);
const container_stringSpan_1 = ref<HTMLDivElement | null>(null);
const container_stringSpan_2 = ref<HTMLDivElement | null>(null);
const container_stringSpan_3 = ref<HTMLDivElement | null>(null);
const container_stringSpan_4 = ref<HTMLDivElement | null>(null);
const container_stringSpan_5 = ref<HTMLDivElement | null>(null);
const container_stringSpan_6 = ref<HTMLDivElement | null>(null);
const stringContainer = ref<HTMLDivElement | null>(null);
const tagItem = ref<HTMLDivElement | null>(null);
const scaleFactorDefault = 1;
const route = useRoute();
const scaleFactor = ref<number>(scaleFactorDefault);

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
    smallerText: 1,
    indexState: 1,
  },
  {
    container: container_stringSpan_3.value,
    text: stringSpan_3.value,
    smallerText: 1,
    indexState: 2,
  },
  {
    container: container_stringSpan_4.value,
    text: stringSpan_4.value,
    smallerText: 1,
    indexState: 3,
  },
  {
    container: container_stringSpan_5.value,
    text: stringSpan_5.value,
    smallerText: 1,
    indexState: 4,
  },
  {
    container: container_stringSpan_6.value,
    text: stringSpan_6.value,
    smallerText: 1,
    indexState: 5,
  },
];
const updateValue = (novoValor: unknown[], valorAnterior: unknown[]): void => {
  if (novoValor.every((item) => !item)) return;
  const indexState = novoValor.findIndex(
    (item, index) => ![item].includes(valorAnterior[index]) && novoValor
  );
  const container = stringContainer.value;
  if (!container) return;
  resizeFont(indexState, 1, 22 * scaleFactor.value);
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
      scaleFactor.value = scale
      return;
    }
    scaleFactor.value = scaleFactorDefault
    tagElement.style.height = `auto`;
    tagElement.style.transformOrigin = `inherit`;
    tagElement.style.scale = `1`;
    tagElement.style.marginLeft = `0`;
  });
}
</script>

<template>
  <div class="tag-item" ref="tagItem">
    <div class="shoes-group" :style="{ marginLeft: '25px', marginTop: '20px', position: 'relative' }">
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
      <SchoolDrawTagClip
        :width="`${(width + 0.02) * scaleFactor}cm`"
        :height="`${height * scaleFactor}cm`"
        :fillBackground="getBackgound(props.field).fillBackground"
        :urlImage="getBackgound(props.field)?.urlImage"
      />
      <div
        v-if="base64ImageNoBack"
        :style="{
          position: 'absolute',
          width: `${height * 0.65 * scaleFactor}cm`,
          height: `${height * 0.65 * scaleFactor}cm`,
          textAlign: 'center',
          left: 0,
          marginLeft: '22px',
          alignSelf: 'center',
        }"
      >
        <img
          :style="{
            width: 'auto',
          height: 'inherit',
          }"
          :src="base64ImageNoBack"
          alt="Draw"
        />
      </div>
      <div
        class="school-draw"
        ref="stringContainer"
        :style="{
          fontFamily: getTextFont(props.field).familyName,
          fontSize: `${15 * scaleFactor}px`,
          width: `${width * scaleFactor}cm`,
          height: `${(height - 0.2) * scaleFactor}cm`,
          position: 'absolute',
          paddingLeft: `${3.8 * scaleFactor}cm`,
          bottom: 0,
        }"
      >
        <span
          class="medium-tag-text string-container"
          :style="{
            display: 'flex',
            verticalAlign: 'middle',
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgound(props.field).fillBackground,
              base64ColorPalette,
              Boolean(base64Image),
              getShadowTextColor(props.field)
            )}`,
            height: `${21 * scaleFactor}px`,
            color: getTextColor(props.field),
          }"
        >
          Nome:
          <div
            ref="container_stringSpan_1"
            :style="{
              width: '100%',
              overflow: 'hidden',
              marginLeft: '6px',
              alignSelf: 'center',
              lineHeight: '1em',
            }"
          >
            <span ref="stringSpan_1">{{
              getText(props.field, 0, [EItemType.text])
            }}</span>
          </div>
        </span>
        <span
          class="medium-tag-text string-container"
          :style="{
            display: 'flex',
            verticalAlign: 'middle',
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgound(props.field).fillBackground,
              base64ColorPalette,
              Boolean(base64Image),
              getShadowTextColor(props.field)
            )}`,
            height: `${21 * scaleFactor}px`,
            color: getTextColor(props.field),
          }"
        >
          Prof:
          <div
            ref="container_stringSpan_2"
            :style="{
              width: '100%',
              overflow: 'hidden',
              marginLeft: '20px',
              alignSelf: 'center',
              lineHeight: '1em',
            }"
          >
            <span ref="stringSpan_2">{{
              getText(props.field, 1, [EItemType.text])
            }}</span>
          </div>
        </span>
        <span
          class="medium-tag-text string-container"
          :style="{
            display: 'flex',
            verticalAlign: 'middle',
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgound(props.field).fillBackground,
              base64ColorPalette,
              Boolean(base64Image),
              getShadowTextColor(props.field)
            )}`,
            height: `${21 * scaleFactor}px`,
            color: getTextColor(props.field),
          }"
        >
          Escola:
          <div
            ref="container_stringSpan_3"
            :style="{
              width: '100%',
              overflow: 'hidden',
              alignSelf: 'center',
              marginLeft: '6px',
              lineHeight: '1em',
            }"
          >
            <span ref="stringSpan_3">{{
              getText(props.field, 2, [EItemType.text])
            }}</span>
          </div>
        </span>
        <span
          class="medium-tag-text string-container"
          :style="{
            display: 'flex',
            verticalAlign: 'middle',
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgound(props.field).fillBackground,
              base64ColorPalette,
              Boolean(base64Image),
              getShadowTextColor(props.field)
            )}`,
            height: `${21 * scaleFactor}px`,
            color: getTextColor(props.field),
          }"
        >
          Matéria:
          <div
            ref="container_stringSpan_4"
            :style="{
              width: '100%',
              overflow: 'hidden',
              marginLeft: '6px',
              alignSelf: 'center',
              lineHeight: '1em',
            }"
          >
            <span ref="stringSpan_4">{{
              getText(props.field, 3, [EItemType.text])
            }}</span>
          </div>
        </span>
        <div>
          <div
            :style="{
              width: '100%',
              display: 'flex',
            }"
          >
            <span
              class="medium-tag-text string-container"
              :style="{
                display: 'flex',
                height: `${21 * scaleFactor}px`,
                verticalAlign: 'middle',
                textShadow: `${textShadow(
                  builder,
                  getTextColor(props.field),
                  getBackgroundColor(props.field),
                  [],
                  false,
                  getShadowTextColor(props.field)
                )}`,
                color: getTextColor(props.field),
              }"
            >
              Ano:
              <div
                ref="container_stringSpan_5"
                :style="{
                  width: '100%',
                  overflow: 'hidden',
                  marginLeft: '6px',
                  alignSelf: 'center',
                  lineHeight: '1em',
                }"
              >
                <span ref="stringSpan_5">{{
                  getText(props.field, 4, [EItemType.text])
                }}</span>
              </div>
            </span>
            <span
              class="medium-tag-text string-container"
              :style="{
                display: 'flex',
                height: `${21 * scaleFactor}px`,
                verticalAlign: 'middle',
                textShadow: `${textShadow(
                  builder,
                  getTextColor(props.field),
                  getBackgroundColor(props.field),
                  [],
                  false,
                  getShadowTextColor(props.field)
                )}`,
                color: getTextColor(props.field),
              }"
            >
              Sala:
              <div
                ref="container_stringSpan_6"
                :style="{
                  width: '100%',
                  overflow: 'hidden',
                  marginLeft: '6px',
                  alignSelf: 'center',
                  lineHeight: '1em',
                }"
              >
                <span ref="stringSpan_6">{{
                  getText(props.field, 5, [EItemType.text])
                }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tag-description" :style="{ marginLeft: '25px' }">
      <p class="tag-title m-0">Etiqueta Escolar com Desenho</p>
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
  flex: 1;
}

.tag-item {
  position: relative;
  text-align: left;
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

.school-draw-text {
  user-select: none;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
  overflow: hidden;
}

.school-draw {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  background-size: 100% 100% !important;
  background-position: center !important;
  font-size: 15px;
  line-height: normal;
  white-space: nowrap;
  display: grid;
  padding: 1rem;
  padding-left: 3.8cm;
  align-content: center;
  text-align: left;
  grid-auto-rows: min-content;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: 4px;
  grid-template-columns: repeat(1, 1fr);
  border-radius: 10px;
}

.school-draw-round {
  border-radius: 50%;
}
</style>
