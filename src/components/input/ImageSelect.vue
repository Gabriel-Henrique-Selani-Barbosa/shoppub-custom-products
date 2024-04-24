<script setup lang="ts">
import { IItemImage, IItemImageUpload, IItemImageGroup, IStep } from "@/models";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

const builder = useBuilderState();
interface IImageSelect {
  field: IItemImageGroup;
  parent?: IItemImageGroup;
  step?: IStep<any, any, any>;
  steps?: IStep<any, any, any>[];
  active?: Boolean;
  search?: string;
  isDraw?: Boolean;
}

const props = defineProps<IImageSelect>();
const searchValue = ref(props.search ?? "");
const data = {
  childrens: !props.parent ? [props.field] : props.field.children,
};
function matchesSearch(name: string) {
  if (!props.search) return true;

  const normalizedSearch = normalizeString(props.search).toLowerCase();
  const normalizedName = normalizeString(name).toLowerCase();

  return props.search.trim() === "" || normalizedName.includes(normalizedSearch);
}
const isImageGroup = (childrens?: (IItemImageGroup | IItemImage | IItemImageUpload)[]) =>
  ensure(childrens).every((row) =>
    ensure(row.children)
      ?.map((item) => item)
      .every((item: any) => item.type === "image")
  );
const imagesList = computed(() =>
  ensure(data.childrens).filter((item) => {
    return item?.type === "image-group" && matchesSearch(item.name);
  })
);
function updateSelected(item: IItemImageGroup | IItemImage | IItemImageUpload) {
  ensure(data.childrens).forEach((groupItem) => {
    groupItem.config.selected = item.id === groupItem.id && !groupItem.config.selected;
  });
  props.field.config.checked = props.field.config.required
    ? imagesList.value.some((item) => item.config.selected)
    : true;
}
function updateSelectedStepItem(item: IItemImageGroup | IItemImage | IItemImageUpload) {
  if (item.type === "image-upload") {
    builder.setImageSelected(null);
  } else {
    const imageSelected = builder.imagesList?.find((image) => image.category === item.category && image.config.selected)
    if (imageSelected) { builder.setImageSelected(imageSelected) }
  }
  ensure(props.step?.children).forEach((stepItem) => {
    stepItem.config.selected =
      item.id === stepItem.id ? !stepItem.config.selected : false;
  });
  props.field.config.checked = props.field.config.required
    ? imagesList.value.some((item) => item.config.selected)
    : true;
}
async function changeSelectedImage(image: IItemImage) {
  const loopThroughChildren = (item: IItemImageGroup) => {
    if (!isImageGroup(item.children)) {
      ensure(item.children).forEach((child) => {
        loopThroughChildren(child as IItemImageGroup);
      });
      return;
    }
    ensure(item.children).forEach((current) => {
      ensure(current?.config).selected = current === image && !current?.config.selected;
    });
  };
  const converted = await convertImageToBase64(image.config.url)
  builder.setTextShadowItem(builder.product?.only_single_colors ? '' : getContrastColor(converted.base64ColorPalette[0]))
  if (builder.product?.only_single_colors) {
    const textColor = image.primaryColor
    const indexFont = builder.steps.findIndex(item => item.type === 'font')
    const indexColorgrid = builder.steps[indexFont].children?.findIndex(item => item.type === 'color-grid') || 1;
    if (builder.steps?.[indexFont]?.children?.[indexColorgrid] && builder.steps[indexFont].children) {
      const options = builder.steps[indexFont].children?.[indexColorgrid]?.config?.options.map((item: any) => ({ ...item, selected: item.value === textColor }));
      const children = [...(builder.steps[indexFont].children || [])]
      children[indexColorgrid].config.options = options
      builder.steps[indexFont].children = children
    }
  }
  loopThroughChildren(props.parent ?? props.field);
  builder.setImageSelected(image);
  props.field.config.checked = props.field.config.required
    ? imagesList.value.some((item) => item.config.selected)
    : true;
}
function clearSearch() {
  searchValue.value = "";
}
onMounted(() => {
  function selectFirstItem(step: any, parent: any, isImageGroup: boolean) {
    let shouldSelect;
    if (!isImageGroup) {
      shouldSelect = step.children?.find((item: any) => item.config.selected);
      if (!shouldSelect && data.childrens?.length) {
        step.children[0].config.selected = true;
      }
    }
  }

  selectFirstItem(props.field, props.parent, isImageGroup(data.childrens));
  props.field.config.checked = props.field.config.required
    ? imagesList.value.some((item) => item.config.selected)
    : true;
});
</script>

<template>
  <template v-if="parent">
    <template v-if="!isImageGroup(data.childrens)">
      <div class="group-tabs">
        <button v-for="(group, g) in data.childrens" :key="g" class="group-tabs__button"
          :class="{ selected: group?.config.selected }" @click="updateSelected(group as IItemImageGroup)">
          <figure v-if="group?.config.url && group?.config.url !== ''">
            <img :src="group?.config.url" alt="" />
          </figure>
          <span v-else class="text">{{ group.name }}</span>
        </button>
      </div>
      <div class="group-main">
        <ImageSelect v-for="(group, g) in data.childrens" :key="g" :field="(group as IItemImageGroup)"
          :parent="parent ?? field" :search="search" :step="props.step" :isDraw="props.isDraw" />
      </div>
    </template>

    <template v-else>
      <div class="group-list" v-if="ensure(field?.config).selected">
        <template v-if="ensure(imagesList).length > 0">
          <template v-for="(item, i) in imagesList" :key="i">
            <button v-if="matchesSearch(item.name)" class="group-list__item"
              :class="{ selected: item?.config.selected }" @click="changeSelectedImage(item as IItemImage)" :style="{
                height: props.isDraw ? '75px' : '50px',
                background: `url(${item?.config.url})`,
                backgroundSize: props.isDraw ? 'auto 85%' : '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundColor: getBackgroundColor(builder.steps) || 'currentColor',
              }">
              <figure>
                <font-awesome-icon icon="check" class="icon" />
              </figure>
            </button>
          </template>
        </template>

        <template v-else>
          <p class="group-list__void">Nenhuma imagem encontrada.</p>
        </template>
      </div>
    </template>
  </template>

  <div class="group-first-tabs">
    <template v-if="!parent">
      <button v-for="(group, g) in data.childrens" :key="g" :class="{ selected: group?.config.selected }"
        class="group-tabs__button" @click="updateSelectedStepItem(group as IItemImageGroup)">
        <!-- {{ group.category_label }}
          <FontAwesomeIcon icon="chevron-down" class="icon" /> -->
        <figure v-if="group?.config.url && group?.config.url !== ''">
          <img :src="group?.config.url" alt="" />
        </figure>
        <span v-else class="text">{{ group.category_label }}</span>
      </button>
    </template>
  </div>

  <div class="group-first-main" v-for="(group, g) in data.childrens" :key="g">

    <template v-if="props.field.category !== 'image-upload' && !parent">
      <div class="group-main__filter" v-if="group?.config.selected">
        <div class="group-main__filter-text">
          <p>Busque na galeria abaixo ou faça uma busca por texto</p>
        </div>
        <div class="group-main__filter-input">
          <input v-model="searchValue" type="text" />
          <font-awesome-icon icon="search" fixed-width class="icon" v-if="!searchValue || searchValue.trim() === ''" />
          <font-awesome-icon icon="close" class="icon button" fixed-width v-else @click="clearSearch" />
        </div>
      </div>
      <div class="group-main__child" v-if="group.config.selected">
        <ImageSelect :field="(group as IItemImageGroup)" :parent="field" :step="props.step" :search="searchValue"
          :isDraw="['no-backgound'].includes(props.field.category)" />
      </div>
    </template>

    <template v-if="props.field.category == 'image-upload'">
      <div class="group-main__child" v-if="group.config.selected">
        <InputImageUpload :step="props.step" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.group-tabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: stretch;
  justify-content: flex-start;

  >.group-first-main {
    display: none;
  }

  &__button {
    color: #fff;
    background: var(--color-secondary-light);
    border: 0;
    margin: 0;
    padding: 0;
    display: block;
    white-space: nowrap;
    word-wrap: unset;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    transition: 0.3s;
    cursor: pointer;

    .text {
      line-height: 2rem;
      padding: 0.5rem 1rem;
      display: block;
    }

    figure {
      width: 4rem;
      height: 4rem;
      margin: 0;
      padding: 0.5rem;
      display: block;
      box-sizing: border-box;

      img {
        width: 3rem;
        height: 3rem;
        margin: 0;
        object-fit: cover;
      }
    }

    &:hover {
      opacity: 0.6;
    }

    &.selected {
      background: var(--color-secondary);
    }
  }
}

.group-main {
  background-color: #f3f4f6;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;

  >.group-first-tabs {
    display: none;
  }

  @include last-child-margin-bottom(0);

  &__filter {
    margin: 0 0 1rem;
    display: flex;
    gap: 0.5rem;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include last-child-margin-bottom(0);

    @include respond-to-min(992) {
      gap: 1rem;
      flex-direction: row;
    }

    &-text {
      width: 100%;

      p {
        color: var(--color-primary);
        font-size: 0.75rem;
      }
    }

    &-input {
      width: 100%;
      min-width: 180px;
      flex: 1;
      position: relative;

      input[type="text"] {
        color: var(--color-primary);
        background-color: transparent;
        border: 1px solid var(--color-primary-light);
        width: 100%;
        min-width: 160px;
        line-height: 2;
        padding: 0 2rem 0 1rem;
        position: relative;
        z-index: 2;
        border-radius: 0.5rem;
        transition: 0.3s;

        &:focus {
          border: 1px solid var(--color-primary-dark);
          outline: none;
        }
      }

      .icon {
        color: var(--color-primary);
        font-size: 1rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 1;
        transition: 0.3s;

        &.button {
          cursor: pointer;
          z-index: 3;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }

  &__child {
    padding: 10px;
  }

  &__button {
    color: #fff;
    background: var(--color-primary-light);
    border: 0;
    width: 100%;
    line-height: 2;
    margin: 0 0 1rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-content: center;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }

    .icon {
      font-size: 1.25em;
      transition: 0.3s;
    }

    &.selected {
      background: var(--color-primary);

      .icon {
        transform: rotateZ(180deg);
      }
    }

    @include last-child-margin-bottom(0);
  }
}

.group-list {
  border: 1px solid var(--color-secondary);
  max-height: 400px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  overflow: auto;

  &__void {
    color: var(--color-tertiary);
    text-align: center;
    padding: 0.5rem;
    grid-column-start: span 2;
  }

  &__item {
    border: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    figure {
      width: 100%;
      margin: 0;
      height: 75px;
      display: block;
      overflow: hidden;

      &:before {
        content: "";
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        transition: 0.3s;
        opacity: 0;
      }

      .icon {
        color: #fff;
        font-size: 2rem;
        position: absolute;
        top: calc(50% - 1rem);
        left: calc(50% - 1rem);
        transition: 0.5s cubic-bezier(0.36, 0.06, 0.18, 1.54);
        opacity: 0;
        transform: scale(0) rotateZ(0);
        z-index: 3;
      }

      img {
        width: 100%;
        margin: auto;
        position: absolute;
        top: -1000%;
        right: -1000%;
        bottom: -1000%;
        left: -1000%;
        object-fit: fill;
      }
    }

    &.selected {
      box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.25rem rgba(0, 0, 0, 0.5);

      figure {
        &:before {
          opacity: 1;
        }

        .icon {
          opacity: 1;
          transform: scale(1) rotateZ(359deg);
        }
      }
    }
  }
}
</style>
