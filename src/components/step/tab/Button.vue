<script setup lang="ts">
  interface TabButton {
    active?: boolean;
    checked?: boolean;
    disabled?: boolean;
  }

  const props = defineProps<TabButton>();
</script>

<template>
  <button class="tab-nav-button" :class="{active, checked}" :disabled="disabled">
    <span>
      <slot />
    </span>
  
    <UiCheckMark size="1.25em" :checked="checked" color="currentColor" />
  </button>
</template>

<style lang="scss">
  .tab-nav-button {
    color: #ce5b96;
    background-color: #eeeeee;
    border: 0;
    width: 100%;
    font-size: 1rem;
    line-height: 2;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    display: flex;
    position: relative;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    counter-increment: step;
    gap: 1rem;
    cursor: pointer;

    & + :global(.tab-nav-button) {
      border-top: 1px solid #d0d0d0;
    }

    &.active {
      font-weight: 700;

      &:after {
        content: "";
        border-left: 1em solid #eeeeee;
        border-top: 1.25rem solid transparent;
        border-bottom: 1.25rem solid transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: calc(50% - 1.25rem);
        left: 100%;
      }
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }

    &:before {
      content: counter(step);
      color: #fff;
      background-color: #ce5b96;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      text-align: center;
      align-items: center;
      align-content: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      display: flex;
      border-radius: 50%;
    }

    span {
      text-align: left;
      margin-right: auto;
      flex: 1;
    }
  }
</style>
