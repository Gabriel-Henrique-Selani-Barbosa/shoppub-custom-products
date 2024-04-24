<script setup lang="ts">
import { IStep } from "@/models";

interface StepRendererProps {
  active?: boolean;
  index: number;
  step: IStep<any, any, any>;
}

const props = defineProps<StepRendererProps>();
const builder = useBuilderState();
const isMobile = ref<boolean>(false);
const stepElement = ref<HTMLDivElement | null>(null);

onMounted(() => {
  isMobile.value = window.innerWidth < 980;
  ensure(props.step.children)
    ?.find((item) => item.type === "font-selector")
    ?.config.options.forEach((itemFont: any) => {
      if (!itemFont.file) return;
      const fontFaceStyle = `@font-face {
        font-family: ${itemFont.name};
        src: url(${itemFont.file}) format("truetype");
      }`;

      const styleElement = document.createElement("style");
      styleElement.innerHTML = fontFaceStyle;
      document.head.appendChild(styleElement);
    });
  if (
    ensure(props.step.type) === "font" &&
    !ensure(props.step.children)?.find((item) => item.slug === "border-color")
  ) {
    const colorGrid = ensure(props.step.children)?.find((item) => item.type === "color-grid");
    if (builder.product?.only_single_colors) {
      const childrens = ensure(props.step.children)?.filter((item) => item.type !== "color-grid");
      childrens.push({
        id: 8,
        name: "Selecione a cor da fonte desejada",
        label: "Selecione a cor da fonte desejada",
        slug: "Selecione-a-cor-da-fonte-desejada",
        description: "",
        type: "color-grid",
        noRender: false,
        checked: true,
        config: {
          required: false,
          checked: true,
          options: [
            {
              id: 3,
              label: "Preto",
              value: "#000000",
              selected: true,
              disabled: true
            },
            {
              id: 4,
              label: "Branco",
              value: "#ffffff",
              selected: false,
              disabled: true
            }
          ]
        }
      })
      props.step.children = childrens
    }
    if (!builder.product?.only_single_colors) {
      props.step.children?.push({
        ...colorGrid,
        config: {
          ...colorGrid?.config,
          allowNone: true,
          required: false,
          options: [...colorGrid?.config.options.map((item: any) => ({
            ...item,
            selected: false,
          })), {
            id: 99,
            label: "Sem Borda",
            value: "#00000000",
            selected: false
          }],
        },
        id: 0,
        name: "Selecione a cor da borda desejada",
        label: "Selecione a cor da borda desejada",
        slug: "border-color",
      });
    }
  }
});
</script>

<template>
  <template v-if="!builder.isStartPage && !builder.isFinishPage">
    <StepAccordionButton :active="active" @click="builder.setStep(index)">
      {{ step.label }}
    </StepAccordionButton>

    <div class="step-container">
      <div class="step" :class="{ expanded: active }" :style="{
        maxHeight: active
          ? `calc(100vh - ${isMobile ? '(33vh + 36px)' : '36px'} - (${builder.steps.length || 0
          } * 37px))`
          : 0,
        minHeight: active
          ? `calc(100vh - ${isMobile ? '(33vh + 36px)' : '36px'} - (${builder.steps.length || 0
          } * 37px))`
          : 0,
      }">
        <template v-if="step.children?.length && step.type !== 'image'">
          <StepItem v-for="(child, i) in step.children" :key="`${step.id}-${i}`" :item="child" ref="stepElement"
            :step="step" />
        </template>

        <template v-if="step.children?.length && step.type === 'image'">
          <div class="group-tabs">
            <StepItem v-for="(child, i) in step.children" :key="`${step.id}-${i}`" :item="child" ref="stepElement"
              :step="step" />
          </div>
          <div class="group-main">
            <StepItem v-for="(child, i) in step.children" :key="`${step.id}-${i}`" :item="child" ref="stepElement"
              :step="step" />
          </div>
        </template>

        <template v-if="(builder.steps.length - 1) === builder.step">
          <StepNavButton class="button-next" @click="builder.nextStep()">
            Finalizar Compra
            <FontAwesomeIcon icon="chevron-right" />
          </StepNavButton>
        </template>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.group-tabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: stretch;
  justify-content: flex-start;

  .group-first-tabs {
    display: none;
  }

  &__button {
    color: #fff;
    background: var(--color-secondary-light);
    border: 0;
    margin: 0;
    padding: 0;
    display: block;
    white-space: nowrap;
    word-wrap: unset;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    transition: 0.3s;
    cursor: pointer;

    .text {
      line-height: 2rem;
      padding: 0.5rem 1rem;
      display: block;
    }

    figure {
      width: 4rem;
      height: 4rem;
      margin: 0;
      padding: 0.5rem;
      display: block;
      box-sizing: border-box;

      img {
        width: 3rem;
        height: 3rem;
        margin: 0;
        object-fit: cover;
      }
    }

    &:hover {
      opacity: 0.6;
    }

    &.selected {
      background: var(--color-secondary);
    }
  }
}

.group-main {
  background-color: #f3f4f6;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;

  @include last-child-margin-bottom(0);

  &__filter {
    margin: 0 0 1rem;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include last-child-margin-bottom(0);

    @include respond-to-min(992) {
      gap: 1rem;
      flex-direction: row;
    }

    &-text {
      width: 100%;

      p {
        color: var(--color-primary);
        font-size: 0.75rem;
      }
    }

    &-input {
      width: 100%;
      min-width: 180px;
      flex: 1;
      position: relative;

      input[type="text"] {
        color: var(--color-primary);
        background-color: transparent;
        border: 1px solid var(--color-primary-light);
        width: 100%;
        min-width: 160px;
        line-height: 2;
        padding: 0 2rem 0 1rem;
        position: relative;
        z-index: 2;
        border-radius: 0.5rem;
        transition: 0.3s;

        &:focus {
          border: 1px solid var(--color-primary-dark);
          outline: none;
        }
      }

      .icon {
        color: var(--color-primary);
        font-size: 1rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 1;
        transition: 0.3s;

        &.button {
          cursor: pointer;
          z-index: 3;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }

  &__button {
    color: #fff;
    background: var(--color-primary-light);
    border: 0;
    width: 100%;
    line-height: 2;
    margin: 0 0 1rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-content: center;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.5;
    }

    .icon {
      font-size: 1.25em;
      transition: 0.3s;
    }

    &.selected {
      background: var(--color-primary);

      .icon {
        transform: rotateZ(180deg);
      }
    }

    @include last-child-margin-bottom(0);
  }
}

.step-container {
  position: relative;

  .step {
    max-height: 0;
    padding: 0 1rem;
    flex: 1;
    overflow-y: scroll;
    transition: 0.1s;

    &.expanded {
      padding: 1rem;
      padding-bottom: 5px;
    }

    .step-nav-by-step {
      width: calc(100% + 2rem);
      padding-top: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      bottom: 0px;
      margin-left: -1rem;
      margin-right: -1rem;

      & .button-next {
        background-color: darken(#19d319, 10);

        &:hover {
          background: darken(#19d319, 20);
        }
      }

      & .button-back {
        background-color: darken(#ce5b96, 10);

        &:hover {
          background: darken(#ce5b96, 20);
        }
      }
    }
  }
}
</style>
