<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface AccordionButtonProps {
  active?: boolean;
}

const props = defineProps<AccordionButtonProps>();
</script>

<template>
  <button class="button" :class="{ active }">
    <slot />
    <span class="button__icon">
      <FontAwesomeIcon icon="chevron-down" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button__icon {
  display: inline-flex;
  transition: 0.3s;
}

.button {
  color: #fff;
  background: #70cacd;
  border: 0;
  width: 100%;
  text-transform: uppercase;
  font-size: 18px;
  line-height: 28px;
  padding: 0.25rem 1rem;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: 0.3s;
  border-bottom: 1px solid #fff;

  @media (min-width: 960px) {
    display: flex;
  }

  &:hover {
    background-color: #ee7ba6;
  }

  @media (max-width: 960px) {
    display: flex;
  }

  &.active {
    background: #ce5b96;

    .button__icon {
      transform: rotateZ(180deg);
    }
  }
}
</style>
