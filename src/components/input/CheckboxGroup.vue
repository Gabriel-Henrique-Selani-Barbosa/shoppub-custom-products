<script setup lang="ts">
import { IItemCheckbox } from '@/models';

interface IInput {
  field: IItemCheckbox;
}

const props = defineProps<IInput>();
</script>

<template>
  <FormGroup v-if="field.config.options" :label="field.label">
    <label v-for="(item, i) in field.config.options" :key="i" class="checkbox">
      <input type="checkbox" class="checkbox__input" v-model="item.selected" />
      <UiCheckMark
        class="checkbox__mark"
        :checked="item.selected"
        size="1em"
        color="currentColor"
      />
      <span class="checkbox__text">
        {{ item.label }}
      </span>
    </label>
  </FormGroup>
</template>

<style lang="scss" scoped>
.checkbox__text {
  user-select: none;
  flex: 1;
}

.checkbox__mark {
  width: 1.5rem;
}

.checkbox__input {
  display: none;
}

.checkbox {
  width: 100%;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--color-gray);
  }

  @include last-child-margin-bottom(0);
}
</style>
