<script setup lang="ts">
import { IInputConfigOption, IItemFontSelector } from '@/models';

interface IInputDropdown {
  field: IItemFontSelector;
}

const props = defineProps<IInputDropdown>();

const open = ref<boolean>(false);
const value = ref<any>(null);

function updateValue(option: IInputConfigOption<any> | null, size?: number) {
  ensure(props.field.config.options).forEach((item) => {
    item.selected = item.id === option?.id ?? false;
  });
  value.value = option;
  toggleOpen(false);
  props.field.config.checked = props.field.config.required ? props.field.config.options?.some(item => item.selected) : true;
}

function toggleOpen(force?: boolean) {
  open.value = typeof force === 'boolean' ? force : !open.value;
}

onMounted(() => {
  props.field.config.checked = props.field.config.required ? props.field.config.options?.some(item => item.selected) : true;
  if (ensure(props.field.config.options)) {
    value.value =
      ensure(props.field.config.options).find(
        (item) => item.selected === true
      ) ?? null;
  }
});
</script>

<template>
  <FormGroup :label="field.label">
    <div class="font-selector" tabindex="0">
      <button class="font-selector__button main" @click="toggleOpen()">
        <span class="text">
          {{ value ? value.name : 'SELECIONE' }}
        </span>
        <FontAwesomeIcon v-if="!open" icon="chevron-down" class="align-self-center"/>
        <FontAwesomeIcon v-if="open" icon="chevron-down" class="align-self-center fa-rotate-180"/>
      </button>
      <div class="font-selector__list" :class="{ open }">
        <button class="font-selector__button" @click="updateValue(null)" :style="{ fontFamily: 'inherit' }">
          <span class="text">
            {{ 'SELECIONE' }}
          </span>
        </button>
        <button v-for="(option, i) in props.field.config.options" class="font-selector__button"
          :class="{ selected: value?.value === option }" :key="i" @click="updateValue(option)"
          :style="{ fontFamily: option.name }">
          <span class="text">{{ option.name }}</span>
        </button>
      </div>
    </div>

  </FormGroup>
</template>

<style lang="scss" scoped>
.font-specimen__range {
  width: 100%;
}

.font-specimen__example {
  font-size: 3rem;
  word-wrap: break-word;
  margin: 0 0 1rem;

  @include last-child-margin-bottom(0);
}

.font-specimen__title {
  font-weight: 700;
  word-wrap: break-word;
  margin: 0 0 0.5rem;

  @include last-child-margin-bottom(0);
}

.font-specimen {
  margin: 1rem 0 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.25rem;
  padding: 0.7rem;

  @include last-child-margin-bottom(0);
}

.font-selector__button {
  background: transparent;
  border: 1px solid var(--color-gray);
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  user-select: none;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--color-gray-pastel);
  }

  &:focus {
    background: var(--color-gray-pastel);
    box-shadow: 0 0 0 0.2rem var(--color-gray-25);
    outline: none;
  }

  &.selected {
    font-weight: 600;
  }

  .text {
    text-align: left;
    flex: 1;
  }
}

.font-selector__list {
  background: #fff;
  border: 1px solid var(--color-gray);
  width: 100%;
  max-height: 0;
  overflow: auto;
  position: absolute;
  top: 100%;
  left: 0;
  transition: 0.3s;
  opacity: 0;
  border-radius: 0.25rem;
  z-index: 4;

  &.open {
    max-height: 12rem;
    opacity: 1;
  }

  .font-selector__button {
    border: 0;
    border-radius: 0;

    &+.font-selector__button {
      border-top: 1px solid var(--color-gray);
    }
  }
}

.font-selector {
  width: 100%;
  position: relative;
}
</style>
