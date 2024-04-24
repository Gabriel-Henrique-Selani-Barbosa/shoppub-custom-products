<script setup lang="ts">
type TagType = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextType = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextProps = {
  bold?: boolean;
  tag?: TagType;
  variant?: TextType;
};

const props = defineProps<TextProps>();

const componentClass = computed(() => {
  const classes: Array<string> = [props.variant || "p"];
  if (props.bold) {
    classes.push("bold");
  }
  return classes.join(" ");
});
const componentTag = computed(() => props.tag || props.variant || "p");
</script>

<template>
  <component :is="componentTag" :class="componentClass">
    <slot />
  </component>
</template>


<style lang="scss">
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
.p {
  line-height: 1.25;
  margin: 0 0 1rem;
  padding: 0;
  display: block;

  &:last-child {
    margin-bottom: 0;
  }
}

.h1,
.h2,
.h3,
.h4 {
  font-weight: 400;
}

.h5,
.h6 {
  font-weight: 600;
}

.h4,
.h6 {
  color: var(--color-text-light, #888888);
}

.h1 {
  font-size: 2.25rem;
}

.h2 {
  font-size: 2rem;
}

.h3 {
  font-size: 1.75rem;
}

.h4 {
  font-size: 1.5rem;
}

.h5 {
  font-size: 1.25rem;
  font-weight: 700;
}

.h6 {
  font-size: 1rem;
  font-weight: 700;
}

.bold {
  font-weight: 700;
}
</style>
