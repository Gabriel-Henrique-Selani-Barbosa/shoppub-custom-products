<script setup lang="ts">
import { IItemBoolean } from '@/models';

interface IInput {
  field: IItemBoolean;
}

const props = defineProps<IInput>();
</script>

<template>
  <FormGroup v-if="field.config.options">
    <label class="boolean">
      <input
        type="checkbox"
        class="boolean__input"
        v-model="field.config.options[0].selected"
      />
      <UiCheckMark
        class="boolean__mark"
        :checked="field.config.options[0].selected"
        size="1em"
        color="currentColor"
      />
      <span class="boolean__text">
        {{ props.field.label }}
      </span>
    </label>
    <FormError v-if="field.config.required && !field.config.options[0]?.selected">
      {{ field.label }} é obrigatório(a)
    </FormError>
  </FormGroup>
</template>

<style lang="scss" scoped>
.boolean__text {
  user-select: none;
  flex: 1;
}

.boolean__input {
  display: none;
}

.boolean {
  width: 100%;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
