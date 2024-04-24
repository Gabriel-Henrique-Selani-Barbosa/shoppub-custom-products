<script setup lang="ts">
import { IItemGroup } from '@/models';

interface IInputDropdown {
  field: IItemGroup;
}

const props = defineProps<IInputDropdown>();
</script>

<template>
  <div class="group">
    <p class="group__title">{{ field.label }}</p>
    <FormInput
      v-for="(child, i) in props.field?.children ?? []"
      :key="i"
      :field="child"
    />
  </div>
</template>

<style lang="scss" scoped>
.group__title {
  font-weight: 600;
  margin: 0 0 1rem;

  @include last-child-margin-bottom(0);
}

.group {
  margin: 0 0 1rem;
  display: block;

  @include last-child-margin-bottom(0);
}
</style>
