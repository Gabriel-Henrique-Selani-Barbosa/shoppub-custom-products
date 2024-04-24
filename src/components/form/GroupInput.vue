<template>
  <div v-if="$slots.prepend || $slots.append" class="form-group-input">
    <template v-if="$slots.prepend">
      <slot name="prepend" />
    </template>
    <slot />
    <template v-if="$slots.append">
      <slot name="append" />
    </template>
  </div>
  <template v-else>
    <slot />
  </template>
</template>

<style lang="scss" scoped>
.form-group-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
