<script setup lang="ts">
import { IStep } from "@/models";
const builder = useBuilderState();
interface IInput {
  steps: IStep<any, any, any>[];
  currentStep: number;
}

const props = defineProps<IInput>();

function selectItem(i: number) {
  builder.setStep(i);
}

watchEffect(() => {
  if (props.steps[props.currentStep]) {
    const children = props.steps[
      props.currentStep
    ].children
    props.steps[props.currentStep].config.checked =  children?.length ? children?.every((row) => row.config?.checked) : true;
  }
});
</script>

<template>
  <nav>
    <StepTabButton
      v-for="(step, i) in props.steps"
      :key="i"
      @click="selectItem(i)"
      :active="currentStep === i"
      :checked="step?.config?.checked"
    >
      {{ step.label }}
    </StepTabButton>
  </nav>
</template>
