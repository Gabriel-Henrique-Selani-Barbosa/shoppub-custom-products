<script setup lang="ts">
import type { IItem, IItemGroup } from '@/models';

interface IInput {
  field: IItem<any, any, any>;
}

const props = defineProps<IInput>();
</script>

<template>
  <InputCheckbox v-if="field.type === 'checkbox'" :field="field" />
  <InputCheckboxGroup v-if="field.type === 'checkbox-group'" :field="field" />
  <InputColorGrid v-if="field.type === 'color-grid'" :field="field" />
  <InputDropdown v-if="field.type === 'dropdown'" :field="field" />
  <InputDropdownColor v-if="field.type === 'dropdown-color'" :field="field" />
  <InputGroup v-if="field.type === 'group'" :field="(field as IItemGroup)" />
  <InputRadio v-if="field.type === 'radio'" :field="field" />
  <InputSelect v-if="field.type === 'select'" :field="field" />
  <InputText v-if="field.type === 'text'" :field="field" />
  <InputTextArea v-if="field.type === 'textarea'" :field="field" />
  <InputTextSmall v-if="field.type === 'text-small'" :field="field" />
</template>
