<script setup lang="ts">
import { IItem, IItemGroup, IStep } from '@/models';

interface StepItemProps {
  item: IItem<any, any, any> & IItemGroup,
  step?: IStep<any, any, any>
  active?: boolean
}

const props = defineProps<StepItemProps>();
</script>

<template>
  <template v-if="props.item.type === 'boolean'">
    <InputBoolean :field="item" />
  </template>
  
  <template v-if="item.type === 'checkbox'">
    <InputCheckbox :field="item" />
  </template>
  
  <template v-if="item.type === 'checkbox-group'">
    <InputCheckboxGroup :field="item" />
  </template>

  <template v-if="item.type === 'color-grid'">
    <InputColorGrid :field="item" v-if="!item.noRender" />
  </template>

  <template v-if="item.type === 'dropdown-color'">
    <InputDropdownColor :field="item" />
  </template>

  <template v-if="item.type === 'dropdown'">
    <InputDropdown :field="item" />
  </template>

  <template v-if="item.type === 'font-selector'">
    <InputFontSelector :field="item" />
  </template>

  <template v-if="item.type === 'group'">
    <InputGroup :field="item" />
  </template>

  <template v-if="item.type === 'image-category'" >
    <InputImageSelect :field="item" :step="step" :active="Boolean(active)"/>
  </template>

  <template v-if="item.type === 'number'">
    <InputNumber :field="item" />
  </template>

  <template v-if="item.type === 'radio'">
    <InputRadio :field="item" />
  </template>

  <template v-if="item.type === 'select'">
    <InputSelect :field="item" />
  </template>

  <template v-if="item.type === 'text-small'">
    <InputTextSmall :field="item" />
  </template>

  <template v-if="item.type === 'text'">
    <InputText :field="item" />
  </template>

  <template v-if="item.type === 'textarea'">
    <InputTextArea :field="item" />
  </template>

  <template v-if="item.type === 'text-info'">
    <InputTextInfo :field="item" />
  </template>
</template>
