<script setup lang="ts">
interface IUiCheckMark {
  checked?: boolean;
  color?: string;
  size?: number | string;
}

const props = defineProps<IUiCheckMark>();

const strokeColor = ref(props.color ?? '#787878');
const itemSize = computed(() => {
  if (!props.size) return '3rem';
  return typeof props.size === 'number' ? `${props.size}px` : props.size;
});
</script>

<template>
  <svg
    :width="itemSize"
    :height="itemSize"
    v-bind:class="{
      checked: props.checked,
    }"
    viewBox="0 0 32 32"
  >
    <g transform="matrix(0.9375,0,0,0.9375,1,1)">
      <path
        class="square"
        d="M32,3.242C32,1.453 30.547,0 28.758,0L3.242,0C1.453,0 0,1.453 0,3.242L0,28.758C0,30.547 1.453,32 3.242,32L28.758,32C30.547,32 32,30.547 32,28.758L32,3.242Z"
        :stroke="strokeColor"
      />
    </g>
    <g
      transform="matrix(0.707107,-0.707107,0.707107,0.707107,-3.09188,14.5858)"
    >
      <path class="check" d="M5,7L5,17L25,17" :stroke="strokeColor" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

svg {
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 1.5;
  display: inline-block;
  cursor: pointer;
  transition: 0.3s;

  &.no-events {
    cursor: default;
    pointer-events: none;
  }

  .square {
    fill: none;
    stroke-width: 3px;
  }

  .check {
    fill: none;
    stroke-width: 3px;
    stroke-dasharray: 32;
    stroke-dashoffset: 32;
  }

  &.checked {
    .check {
      -webkit-animation: draw 0.1s linear forwards;
      animation: draw 0.1s linear forwards;
    }
  }
}
</style>
