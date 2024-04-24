<script setup lang="ts">
import { IStep, ETagType } from "@/models";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
import { getShadowTextColor } from "@/utils/getShadowTextColor";
import { getTextFont } from "@/utils/getTextFont";
import { EItemType } from "@/models/item/IItem";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
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
const width = props.width || 8;
const height = props.height || 3.8;
const tagTypes = [ETagType.RectangularSchool, ETagType.SchoolDark, ETagType.SchoolLight];
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
const tagType = ETagType.RectangularSchool;
const scaleFactorDefault = 1;
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

function getBackgound(field: IStep<any, any, any>[]) {
  const response = base64Image.value;
  hasImage.value = Boolean(response);
  if (hasImage.value) return `url(${response})`;
  return getBackgroundColor(field);
}
watch(
  () => builder.imageSelected,
  () => handleImageUpdate(builder.imageSelected, tagTypes)
);
watch(
  () => builder.imageSelected,
  async () => {
    const handleImage = await handleImageUpdate(builder.imageSelected, tagTypes);
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
    <div class="tag" ref="stringContainer" :style="{
      marginTop: '20px',
      marginLeft: '25px',
      position: 'relative',
      fontFamily: getTextFont(props.field).familyName,
      background: getBackgound(props.field),
      width: `${width * scaleFactor}cm`,
      height: `${height * scaleFactor}cm`,
      display: 'grid',
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
      <span class="tag-text string-container" :style="{
        display: 'flex',
        verticalAlign: 'middle',
        fontSize: `${18 * scaleFactor}px`,
        height: `${26 * scaleFactor}px`,
        textShadow: `${textShadow(
          builder,
          getTextColor(props.field),
          getBackgound(props.field),
          base64ColorPalette,
          hasImage,
          getShadowTextColor(props.field)
        )}`,
        color: getTextColor(props.field),
      }">
        Nome:
        <div ref="container_stringSpan_1" :style="{
          width: '100%',
          overflow: 'hidden',
          lineHeight: '1em',
          alignSelf: 'center',
          marginLeft: '6px',
        }">
          <span ref="stringSpan_1">{{ getText(props.field, 0, [EItemType.text]) }}</span>
        </div>
      </span>
      <span class="tag-text string-container" :style="{
        display: 'flex',
        verticalAlign: 'middle',
        fontSize: `${18 * scaleFactor}px`,
        height: `${26 * scaleFactor}px`,

        textShadow: `${textShadow(
          builder,
          getTextColor(props.field),
          getBackgound(props.field),
          base64ColorPalette,
          hasImage,
          getShadowTextColor(props.field)
        )}`,
        color: getTextColor(props.field),
      }">
        Prof:
        <div ref="container_stringSpan_2" :style="{
          width: '100%',
          overflow: 'hidden',
          lineHeight: '1em',
          alignSelf: 'center',
          marginLeft: '18px',
        }">
          <span ref="stringSpan_2">{{ getText(props.field, 1, [EItemType.text]) }}</span>
        </div>
      </span>
      <span class="tag-text string-container" :style="{
        display: 'flex',
        verticalAlign: 'middle',
        fontSize: `${18 * scaleFactor}px`,
        height: `${26 * scaleFactor}px`,

        textShadow: `${textShadow(
          builder,
          getTextColor(props.field),
          getBackgound(props.field),
          base64ColorPalette,
          hasImage,
          getShadowTextColor(props.field)
        )}`,
        color: getTextColor(props.field),
      }">
        Escola:
        <div ref="container_stringSpan_3" :style="{
          width: '100%',
          overflow: 'hidden',
          lineHeight: '1em',
          alignSelf: 'center',
          marginLeft: '12px',
        }">
          <span ref="stringSpan_3">{{ getText(props.field, 2, [EItemType.text]) }}</span>
        </div>
      </span>
      <span class="tag-text string-container" :style="{
        display: 'flex',
        verticalAlign: 'middle',
        fontSize: `${18 * scaleFactor}px`,
        height: `${26 * scaleFactor}px`,

        textShadow: `${textShadow(
          builder,
          getTextColor(props.field),
          getBackgound(props.field),
          base64ColorPalette,
          hasImage,
          getShadowTextColor(props.field)
        )}`,
        color: getTextColor(props.field),
      }">
        Matéria:
        <div ref="container_stringSpan_4" :style="{
          width: '100%',
          overflow: 'hidden',
          lineHeight: '1em',
          alignSelf: 'center',
          marginLeft: '12px',
        }">
          <span ref="stringSpan_4">{{ getText(props.field, 3, [EItemType.text]) }}</span>
        </div>
      </span>
      <div :style="{
        width: '100%',
        display: 'flex',
      }">
        <span class="tag-text string-container" :style="{
          display: 'flex',
          verticalAlign: 'middle',
          fontSize: `${18 * scaleFactor}px`,
          height: `${26 * scaleFactor}px`,

          textShadow: `${textShadow(
            builder,
            getTextColor(props.field),
            getBackgound(props.field),
            base64ColorPalette,
            hasImage,
            getShadowTextColor(props.field)
          )}`,
          color: getTextColor(props.field),
        }">
          Ano:
          <div ref="container_stringSpan_5" :style="{
            width: '100%',
            overflow: 'hidden',
            lineHeight: '1em',
            alignSelf: 'center',
            marginLeft: '6px',
          }">
            <span ref="stringSpan_5">{{
              getText(props.field, 4, [EItemType.text])
            }}</span>
          </div>
        </span>
        <span class="tag-text string-container" :style="{
              display: 'flex',
              verticalAlign: 'middle',
              fontSize: `${18 * scaleFactor}px`,
              height: `${26 * scaleFactor}px`,

              textShadow: `${textShadow(
                builder,
                getTextColor(props.field),
                getBackgound(props.field),
                base64ColorPalette,
                hasImage,
                getShadowTextColor(props.field)
              )}`,
              color: getTextColor(props.field),
            }">
          Sala:
          <div ref="container_stringSpan_6" :style="{
            width: '100%',
            overflow: 'hidden',
            alignSelf: 'center',
            lineHeight: '1em',
            marginLeft: '6px',
          }">
            <span ref="stringSpan_6">{{
              getText(props.field, 5, [EItemType.text])
            }}</span>
          </div>
        </span>
      </div>
    </div>
    <div class="tag-description" :style="{ marginLeft: '25px' }">
      <p class="tag-title m-0">Etiqueta Escolar</p>
      <p class="tag-title m-0 tag-dimensions">
        {{ getDimension(width) }} x {{ getDimension(height) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.string-container {
  overflow: hidden;
  white-space: nowrap;
}

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
  flex: 1;
  overflow: hidden;
}

.tag {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  background-size: 100% 100% !important;
  background-position: center !important;
  font-size: 18px;
  white-space: nowrap;
  display: grid;
  padding: 0.6rem;
  padding-right: 1rem;
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
</style>
