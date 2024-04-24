<script setup lang="ts">
import { IItemSelect } from '@/models';

interface IInputDropdown {
  field: IItemSelect;
}

const props = defineProps<IInputDropdown>();

const value = ref<any>(null);

onMounted(() => {
  if (props.field.config.multiple) {
    value.value =
      ensure(props.field.config.options)
        .filter((item) => item.selected === true)
        ?.map((item) => item.value) ?? [];
  } else {
    value.value =
      ensure(props.field.config.options).find((item) => item.selected === true)
        ?.value ?? null;
  }
});

watch(value, () => {
  if (props.field.config.multiple) {
    ensure(props.field.config.options).forEach((item) => {
      item.selected = value.value.includes(item.value);
    });
  } else {
    ensure(props.field.config.options).forEach((item) => {
      item.selected = item.value === value.value;
    });
  }
});
</script>

<template>
  <FormGroup :label="field.label">
    <select v-model="value" :multiple="field.config.multiple">
      <option :value="undefined">SELECIONE</option>
      <option
        v-for="(option, i) in field.config.options"
        :key="i"
        :value="option.value"
        :selected="!!option.selected"
      >
        {{ option.label }}
      </option>
    </select>
  </FormGroup>
</template>

<style lang="scss" scoped>
select {
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
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  &[multiple] {
    min-height: calc(10rem - 2px);
    max-height: 4rem;
    line-height: 2.5rem;
    overflow: auto;
    padding: 0;

    option {
      padding: 0.5rem 1rem;
    }
  }

  &:focus {
    background: var(--color-gray-pastel);
    box-shadow: 0 0 0 0.2rem var(--color-gray-25);
    outline: none;
  }
}
</style>
