<script setup lang="ts">
const builder = useBuilderState();
</script>

<template>
  <div class="step-nav" v-if="builder.isStartPage">
    <button class="step-nav__button" @click="builder.setStep(0)">
      Começar
      <FontAwesomeIcon icon="chevron-right" />
    </button>
  </div>

  <div class="step-nav" v-if="builder.isFinishPage">
    <StepNavButton class="button-back" @click="builder.prevStep()">
      <FontAwesomeIcon icon="chevron-left" />
      Voltar
    </StepNavButton>

    <StepNavButton class="button-next" @click="builder.finishMethod">
      Finalizar
      <FontAwesomeIcon icon="check" />
    </StepNavButton>
  </div>

  <div class="step-nav" v-if="!builder.isStartPage && !builder.isFinishPage">
    <StepNavButton class="button-back" @click="builder.prevStep()" v-if="builder.step > 0">
      <FontAwesomeIcon icon="chevron-left" />
      Voltar
    </StepNavButton>

    <StepNavButton class="button-next" @click="builder.nextStep()">
      Avançar
      <FontAwesomeIcon icon="chevron-right" />
    </StepNavButton>
  </div>
</template>

<style lang="scss">
.step-nav {
  width: 100%;
  margin: auto 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  gap: 2px;

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

  &:last-child {
    margin-bottom: 0;
  }

  &__button {
    color: #fff;
    background: darken(#70cacd, 10);
    border: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.7rem;
    text-transform: uppercase;
    text-align: center;
    padding: 0.25em 2em;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 0.5rem;
    transition: 0.3s;
    cursor: pointer;
    flex: 1;

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
}
</style>
