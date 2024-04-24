<script setup lang="ts">
import { ETagType, IStep } from "@/models";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
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
const width = props.width || 9.5;
const height = props.height || 4;
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
const tagType = ETagType.SchoolPicture;
const route = useRoute();
const scaleFactorDefault = 1;
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
const imagesTagsObject = computed(
  () =>
    ensure(props.field)
      .find((item) => item.type == "image")
      ?.children?.find((row) => row.config.selected)?.config?.children?.[0]
);
function getBackground(field: IStep<any, any, any>[], images: any) {
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
    <div
      class="group"
      ref="stringContainer"
      :style="{
        width: `${width * scaleFactor}cm`,
        height: `${height * scaleFactor}cm`,
        marginLeft: '25px',
        marginTop: '20px',
        position: 'relative'
      }"
    >
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
      <div
        class="tag tag-round"
        ref="stringContainer"
        :style="{
          background: getBackground(props.field, imagesTagsObject),
          border: `15px solid ${getBackgroundColor(props.field)}`,
          width: `${height * scaleFactor}cm`,
          height: `${height * scaleFactor}cm`,
        }"
      />
      <div
        class="tag"
        :style="{
          fontFamily: getTextFont(props.field).familyName,
          background: getBackgroundColor(props.field),
          width: `${(width - height / 2) * scaleFactor}cm`,
          height: `${height * 0.8 * scaleFactor}cm`,
          fontSize: `${15 * scaleFactor}px`,
          padding: `${1 * scaleFactor}rem`,
          marginBottom: `${4 * scaleFactor}px`,
          borderRadius: `${10 * scaleFactor}px`,
          paddingLeft: `${2 * scaleFactor}cm`,
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
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            color: getTextColor(props.field),
          }"
        >
          Nome:
          <div
            ref="container_stringSpan_1"
            :style="{
              width: '100%',
              overflow: 'hidden',
              paddingLeft: `${6 * scaleFactor}px`,
              lineHeight: `1em`,
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
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            color: getTextColor(props.field),
          }"
        >
          Prof:
          <div
            ref="container_stringSpan_2"
            :style="{
              width: '100%',
              overflow: 'hidden',
              paddingLeft: `${6 * scaleFactor}px`,
              lineHeight: `1em`,
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
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            color: getTextColor(props.field),
          }"
        >
          Escola:
          <div
            ref="container_stringSpan_3"
            :style="{
              width: '100%',
              overflow: 'hidden',
              paddingLeft: `${6 * scaleFactor}px`,
              lineHeight: `1em`,
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
              getBackgroundColor(props.field),
              [],
              false,
              getShadowTextColor(props.field)
            )}`,
            color: getTextColor(props.field),
          }"
        >
          Matéria:
          <div
            ref="container_stringSpan_4"
            :style="{
              width: '100%',
              overflow: 'hidden',
              paddingLeft: `${6 * scaleFactor}px`,
              lineHeight: `1em`,
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
                  lineHeight: `1em`,
                  alignSelf: `center`,
                  marginLeft: `${6 * scaleFactor}px`
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
                  lineHeight: `1em`,
                  alignSelf: `center`,
                  marginLeft: `${6 * scaleFactor}px`
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
      <p class="tag-title m-0">Etiqueta Escola com Foto</p>
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
.string-container {
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
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
  justify-content: center;
  align-self: center;
  background-size: 100% 100% !important;
  background-position: center !important;
  line-height: normal;
  white-space: nowrap;
  display: grid;
  align-content: center;
  text-align: left;
  grid-auto-rows: min-content;
  flex-direction: row;
  align-items: center;
  grid-template-columns: repeat(1, 1fr);
}

.tag-round {
  border-radius: 50%;
  position: absolute;
  left: 0;
}
</style>
