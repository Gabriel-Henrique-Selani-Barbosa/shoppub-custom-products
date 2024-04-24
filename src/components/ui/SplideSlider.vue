<template>
  <div class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li v-for="(slide, index) in slides" :key="index" class="splide__slide">
          <component :is="slide.component" v-bind="slide.props" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { Splide } from "@splidejs/splide";

interface Slide {
  component: any;
  props: any;
}

const props = defineProps<{
  slides: Slide[];
  parentRef: any;
}>();

onMounted(() => {
  const splide = new Splide(".splide", {
    type: "slide",
    perPage: 1,
    focus: "center",
    arrows: false,
    pagination: true,
    autoplay: false,
    rewind: true,
    classes: {
      pagination: "splide__pagination display_flex position_initial",
      page : 'splide__pagination__page selected-page',
      arrow: "splide__arrow background_transparent",
    },
  });
  splide.mount();
});
</script>

<style lang="scss" scoped>
.splide {
  height: 100%;
  .position_initial {
    position: initial !important
  }

  .splide__track {
    .splide__list {
      align-items: center;
      max-height: 33vh;
      min-height: 33vh;

      .splide__slide {
        overflow: hidden;
        max-height: 33vh;
      }
    }
  }
}
</style>
