<script setup lang="ts">
import { IItemTextSmall } from "@/models";

interface IInputDropdown {
  field: IItemTextSmall;
}

const props = defineProps<IInputDropdown>();
if (!ensure(props.field.config.options).length) {
  props.field.config.options = [
    {
      value: "",
      label: props.field.label,
    },
  ];
}

watch(
  () => ensure(props.field.config.options)[0].value,
  () => {
    props.field.config.checked = props.field.config.required
      ? Boolean(ensure(props.field.config.options)[0].value)
      : true;
  }
);

onMounted(() => {
  props.field.config.checked = props.field.config.required
    ? Boolean(ensure(props.field.config.options)[0].value)
    : true;
});
</script>

<template>
  <FormGroup
    :required="Boolean(field.config.required)"
    :style="{ marginBottom: '.5rem' }"
  >
    Para etiquetas pequenas, favor abreviar o nome
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <input
      :placeholder="`${field.label} ${Boolean(field.config?.required) ? '*' : ''}`"
      v-if="ensure(field.config.options)[0]"
      type="text"
      maxlength="40"
      :class="{ featured: field.config?.featured || true }"
      v-model="ensure(field.config.options)[0].value"
    />
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </FormGroup>
</template>

<style lang="scss" scoped>
.toggle {
  background: var(--color-gray-darkest);
  width: 2rem;
  height: 1rem;
  display: inline-block;
  position: relative;
  border-radius: 0.5rem;
  transition: 0.3s;
  box-shadow: 0 0 0 1px var(--color-gray);

  &:before {
    content: "";
    background: var(--color-valid-dark);
    width: calc(1rem - 2px);
    height: calc(1rem - 2px);
    margin: 1px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
    border-radius: 50%;
  }

  &.active {
    background: var(--color-gray-pastel);

    &:before {
      background: var(--color-valid);
      left: 1rem;
    }
  }
}

.toggle__wrap {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

input[type="checkbox"] {
  display: none;
}

input[type="text"] {
  background: transparent;
  border: 1px solid var(--color-gray);
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  user-select: none;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &:focus {
    background: var(--color-gray-pastel);
    box-shadow: 0 0 0 0.2rem var(--color-gray-25);
    outline: none;
  }
}
</style>
