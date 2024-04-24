<script setup lang="ts">
import { IInputConfigOption, IItemDropdown } from '@/models';

interface IInputDropdown {
  field: IItemDropdown;
}

const props = defineProps<IInputDropdown>();

const open = ref<boolean>(false);
const value = ref<any>(null);

function updateValue(option: IInputConfigOption<any> | null) {
  ensure(props.field.config.options).forEach((item) => {
    item.selected = item.id === option?.id ?? false;
  });

  value.value = option;
  toggleOpen(false);
}

function toggleOpen(force?: boolean) {
  open.value = typeof force === 'boolean' ? force : !open.value;
}

onMounted(() => {
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
    <div class="dropdown" tabindex="0">
      <button class="dropdown__button main" @click="toggleOpen()">
        <span class="text">{{ value?.label ?? 'SELECIONE' }}</span>
      </button>
      <div class="dropdown__list" :class="{ open }">
        <button class="dropdown__button" @click="updateValue(null)">
          <span class="text">SELECIONE</span>
        </button>
        <button
          v-for="(option, i) in props.field.config.options"
          class="dropdown__button"
          :class="{ selected: value?.value === option.value }"
          :key="i"
          @click="updateValue(option)"
        >
          <span class="text">{{ option.label }}</span>
        </button>
      </div>
    </div>
  </FormGroup>
</template>

<style lang="scss" scoped>
.dropdown__button {
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

.dropdown__list {
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

  .dropdown__button {
    border: 0;
    border-radius: 0;

    & + .dropdown__button {
      border-top: 1px solid var(--color-gray);
    }
  }
}

.dropdown {
  width: 100%;
  position: relative;
}
</style>
