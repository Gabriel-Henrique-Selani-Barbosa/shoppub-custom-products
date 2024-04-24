<script setup lang="ts">
import { ETagType, IItemImage, IItemImageView, IStep } from "@/models";
import { textShadow } from "@/utils/textShadow";
import { getText } from "@/utils/getText";
import { getShadowTextColor } from "@/utils/getShadowTextColor";
import { getTextFont } from "@/utils/getTextFont";
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
const width = props.width || 5;
const height = props.height || 5;
const base64ColorPalette = ref<string[]>([]);
const base64Image = ref<string>("");
const tagType = ETagType.SquareTagPicture;
const hasImage = ref<boolean>(false);
const stringSpan_1 = ref<HTMLDivElement | null>(null);
const stringSpan_2 = ref<HTMLDivElement | null>(null);
const container_stringSpan_1 = ref<HTMLDivElement | null>(null);
const container_stringSpan_2 = ref<HTMLDivElement | null>(null);
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

const imagesTagsObject = computed(() => builder.imageSelected);
const imagesTagsCustom = computed(
  () =>
    ensure(props.field)
      .find((item) => item.type == "image")
      ?.children?.find((row) => row.config.selected)?.config?.children?.[0]
);
function getBackgoundImage(
  images: IItemImage[] = []
): { principal_image: string; secondary_image: string } | undefined {
  const imageView = images.find((item) =>
    item.config.views?.some((row: IItemImageView) => row.type === tagType)
  );
  if (imageView)
    return {
      principal_image: imageView?.config.url,
      secondary_image: imageView?.config.back_url,
    };
  return;
}
watchEffect(() => {
  const url = getBackgoundImage(imagesTagsObject.value?.children as IItemImage[]);
  if (url?.secondary_image) {
    hasImage.value = Boolean(true);
    convertImageToBase64(url.secondary_image).then((item) => {
      base64Image.value = item?.base64Image || "";
      base64ColorPalette.value = item?.base64ColorPalette || [];
    });
  } else {
    hasImage.value = Boolean(false);
    base64Image.value = "";
    base64ColorPalette.value = [];
  }
});
function getBackgound(field: IStep<any, any, any>[], images: any) {
  let response: string | undefined;
  response = images?.config?.base64_cropped;
  if (response) response = `url(${response})`;
  if (!response) response = getBackgroundColor(field);
  return response;
}
function getBackgoundTheme(
  field: IStep<any, any, any>[],
  reference: "primary" | "secondary" = "secondary"
) {
  let response: string | undefined;
  if (reference === "secondary") {
    response = base64Image.value;
  }
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
      resizeFont(index, textCount, container.offsetHeight * 0.35);
    });
  } else {
    resizeFont(indexState, textCount, container.offsetHeight * 0.35);
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
          width: (window.innerWidth) / 2 - 40,
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
    <div class="square-group">
      <div class="square-tag" ref="stringContainer" :style="{
        marginLeft: `${25}px`,
        marginTop: `${20}px`,
        position: 'relative',
        background: getBackgoundTheme(props.field, 'secondary'),
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
          <div class="vertical-line" />
          <span class="text-quote">{{ `${height}cm` }}</span>
          <div class="vertical-line" />
          <div class="horizontal-line" />
        </div>
        <div ref="container_stringSpan_1" v-if="getText(props.field, 0, [EItemType.text])" :style="{
          width: '100%',
          overflow: 'hidden',
        }">
          <span class="square-tag-text string-container" ref="stringSpan_1" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              base64ColorPalette,
              hasImage,
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
          <span class="square-tag-text string-container" ref="stringSpan_2" :style="{
            color: getTextColor(props.field),
            textShadow: `${textShadow(
              builder,
              getTextColor(props.field),
              getBackgroundColor(props.field),
              base64ColorPalette,
              hasImage,
              getShadowTextColor(props.field)
            )}`,
            fontFamily: getTextFont(props.field).familyName,
          }">
            {{ getText(props.field, 1, [EItemType.text]) }}
          </span>
        </div>
      </div>
      <div class="square-tag square-tag-reverse-hole" :style="{
        marginTop: `${20}px`,
        position: 'relative',
        maskImage: `radial-gradient(circle ${18 * scaleFactor}px at ${4.5 * scaleFactor}cm ${0.5 * scaleFactor}cm, transparent 49%, white 50%)`,
        background: getBackgound(props.field, imagesTagsCustom),
        width: `${width * scaleFactor}cm`,
        height: `${height * scaleFactor}cm`,
      }" />
    </div>
    <div class="tag-description" :style="{ marginLeft: `${25}px` }">
      <p class="tag-title m-0">Etiqueta Quadrada Com Foto</p>
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

.string-container {
  overflow: hidden;
  white-space: nowrap;
}

.square-group {
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15)) !important;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
}

.tag-title {
  font-size: 12px;
}

.square-tag-text {
  user-select: none;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
  vertical-align: super;
  overflow: hidden;
}

.square-tag {
  background-size: 100% 100% !important;
  background-position: center !important;
  white-space: nowrap;
  display: grid;
  border-radius: 15px;
  align-content: center;
  text-align: center;
  grid-auto-rows: min-content;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}
</style>
