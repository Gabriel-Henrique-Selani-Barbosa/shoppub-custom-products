<template>
  <div class="warning">
  <slot />
</div>
</template>

<style lang="scss" scoped>
  .warning {
    color: #77787b;
    background: #d5d6dc;
    font-size: 0.75rem;
    margin: 0 0 1rem;
    padding: 1rem;
    border-radius: 0.25rem;

    &:last-child {
      border-bottom: 0;
    }
  }
</style>
