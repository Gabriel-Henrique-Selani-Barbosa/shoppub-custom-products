<script setup lang="ts">
const app = useAppState();
const builder = useBuilderState();
</script>

<template>
  <div class="start">
    <UiText variant="h3">Começar</UiText>

    <UiText variant="h4">
      {{ app.data?.product?.name }}
    </UiText>

    <UiText>
      Clique em Começar para customizar o produto.
    </UiText>
  </div>
</template>

<style lang="scss" scoped>
.start {
  padding: calc(35px + 1rem);
}
</style>
