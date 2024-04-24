<script setup lang="ts">
import { IItemImage, IItemImageGroup } from '@/models';

interface IImageSelect {
  field: IItemImageGroup;
  parent?: IItemImageGroup;
  search?: string;
}

const props = defineProps<IImageSelect>();

const searchValue = ref(props.search ?? '');

function matchesSearch(name: string) {
  if (!props.search) return true;

  const normalizedSearch = normalizeString(props.search).toLowerCase();
  const normalizedName = normalizeString(name).toLowerCase();

  return (
    props.search.trim() === '' || normalizedName.includes(normalizedSearch)
  );
}

const isImageGroup = computed(() =>
  Boolean(ensure(props.field.children).filter((item) => item?.type === 'image').length)
);

const imagesList = computed(() =>
  ensure(props.field.children).filter((item) => {
    return item?.type === 'image' && matchesSearch(item.name);
  })
);

function updateSelected(item: IItemImageGroup | IItemImage) {
  ensure(props.field.children).forEach((groupItem) => {
    groupItem.config.selected = item.id === groupItem.id;
  });
}

function changeSelectedImage(image: IItemImage) {
  const loopThroughChildren = (item: IItemImageGroup) => {
    ensure(item.children).forEach((child) => {
      const isImageGroup =
        Boolean(ensure(child?.children as Array<IItemImage | IItemImageGroup>).filter(
          (item) => item?.type === 'image'
        ).length);

      if (!isImageGroup) {
        loopThroughChildren(child as IItemImageGroup);
      } else {
        ensure(child.children).forEach((current) => {
          ensure(current?.config).selected = current === image;
        });
      }
    });
  };

  loopThroughChildren(props.parent ?? props.field);
}

function clearSearch() {
  searchValue.value = '';
}

onMounted(() => {
  const hasSelected = ensure(props.field.children).filter(
    (item) => item.config.selected
  ).length;

  // if (!hasSelected && ensure(props.field.children)[0]?.type !== 'image') {
  //   ensure(props.field.children)[0].config.selected = true;
  // }

  function loopThrough(item: IItemImageGroup, parent?: IItemImageGroup) { }

  if (!props.parent) {
    ensure(props.field.children).forEach((item) => {
      if (item?.type === 'image') {
      }
    });
  }
});
</script>

<template>
  <div class="group-list">
    <template v-if="ensure(imagesList).length">
      <template v-for="(item, i) in imagesList" :key="i">
        <button v-if="matchesSearch(item.name)" class="group-list__item" :class="{ selected: item?.config.selected }"
          @click="changeSelectedImage(item as IItemImage)">
          <figure>
            <img :src="item?.config.url" alt="" />
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

<style lang="scss" scoped>
.group-tabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: stretch;
  justify-content: flex-start;

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
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;

  @include last-child-margin-bottom(0);

  &__filter {
    margin: 0 0 1rem;
    display: flex;
    gap: 0.5rem;
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

      input[type='text'] {
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
      padding-bottom: 25%;
      display: block;
      overflow: hidden;

      &:before {
        content: '';
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
