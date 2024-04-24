<script setup lang="ts">
import { IItemTextarea } from '@/models';

interface IInputDropdown {
  field: IItemTextarea;
}

const props = defineProps<IInputDropdown>();

watch(() => ensure(props.field.config.options)[0].value, () => {
  props.field.config.checked = props.field.config.required ? Boolean(ensure(props.field.config.options)[0].value) : true;
})

onMounted(() => {
  props.field.config.checked = props.field.config.required ? Boolean(ensure(props.field.config.options)[0].value) : true;
})
</script>

<template>
  <FormGroup v-if="ensure(field.config.options)">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <textarea :placeholder="field.label" v-model="ensure(field.config.options)[0].value"/>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </FormGroup>
</template>

<style lang="scss" scoped>
textarea {
  background: transparent;
  border: 1px solid var(--color-gray);
  width: 100%;
  min-height: 7.5rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  user-select: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s;
  resize: none;

  &:focus {
    background: var(--color-gray-pastel);
    box-shadow: 0 0 0 0.2rem var(--color-gray-25);
    outline: none;
  }
}
</style>
