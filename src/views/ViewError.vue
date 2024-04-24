<script setup lang="ts">
import Logo from "@/assets/img/logo.png";
const props = defineProps<{
  title: string;
  statusCode?: string;
  response?: string;
}>();
</script>

<template>
  <div class="error">
    <div class="error__side">
      <div class="error__logo">
        <img :src="Logo" alt="Logo" class="logo" />
      </div>
      <div class="error__body">
        <p>{{ props.title }}</p>
        <p>{{ props.statusCode }}</p>
        <p>{{ props.response }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100vh;
  align-items: stretch;
  justify-content: center;
  text-align: center;

  &__logo {
    margin: auto;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__side {
    height: 100vh;
    background: #eeeeee;
  }
}
</style>
