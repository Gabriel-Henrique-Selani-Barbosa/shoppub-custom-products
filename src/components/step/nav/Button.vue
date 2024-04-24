<script setup lang="ts">
interface NavButtonProps {
  disabled?: boolean;
}

const props = defineProps<NavButtonProps>();
</script>

<template>
  <button class="step-nav-button" :class="{ disabled }">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.step-nav-button {
  color: #fff;
  background: darken(#70cacd, 10);
  border: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.7rem;
  flex: 1;
  text-transform: uppercase;
  padding: 0.25em 2em;
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 0.5rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: darken(#70cacd, 20);
  }

  &:active {
    box-shadow: 0 0 0 0.25rem #70cacd80;
  }

  &:disabled,
  &.disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
}
</style>
