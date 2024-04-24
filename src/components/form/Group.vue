<script setup lang="ts">
interface IFormGroup {
  label?: string;
  required?: boolean;
  classLabel?: string;
}

const props = defineProps<IFormGroup>();

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div class="form-group">
    <FormLabel :class="classLabel" v-if="label"><span v-if="required">*</span>{{ capitalizeFirstLetter(label) }}</FormLabel>
    <FormGroupInput>
      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <slot />
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </FormGroupInput>
  </div>
</template>

<style lang="scss" scoped>
.form-group {
  width: 100%;
  margin: 0 0 2rem;
  display: block;

  @media (max-width: 960px) {
    margin: 0 0 1rem;
  }

  @include last-child-margin-bottom(0);
}
</style>
