<template>
  <label>
    <slot />
  </label>
</template>

<style lang="scss" scoped>
label {
  color: var(--color-secondary);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 1rem;
  display: block;

  @media (max-width: 960px) {
    margin-bottom: 0;
  }

  @include last-child-margin-bottom(0);
}
</style>
