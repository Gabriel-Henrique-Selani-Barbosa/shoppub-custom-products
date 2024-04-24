<script setup lang="ts">
import { VueCookies } from "vue-cookies";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import CustomProducts from "@/http/custom-products";
import ViewError from "./views/ViewError.vue";

const $cookies = inject<VueCookies>("$cookies");

const app = useAppState();
const builder = useBuilderState();
const getCustomProductsConfig = CustomProducts.GetCustomProducts();

const loading = ref(true);

const boostrap = async () => {
  builder.$state.steps = app.$state.data?.steps || [];
  builder.$state.step = -1;
  builder.$state.loading = true;
  setTimeout(() => {
    builder.$state.loading = false;
    loading.value = false;
  }, 2000);
};
const receiveProduct = (event: Event) => {
  if (event instanceof MessageEvent) {
    $cookies?.set("sessionId", String(event.data));
  }
};
onMounted(() => {
  boostrap();
  window.addEventListener("message", (event) => receiveProduct(event));
});
</script>

<template>
  <UiLoader
    v-show="
      loading ||
      ((!getCustomProductsConfig.data?.product && !getCustomProductsConfig.error.title) || getCustomProductsConfig.loading)
    "
    :label-list="true"
  />
  <RouterView v-show="!loading && getCustomProductsConfig.data.product && !getCustomProductsConfig.loading" />
  <ViewError
    v-show="!loading && getCustomProductsConfig.error.title"
    :title="String(getCustomProductsConfig.error.title)"
    :status-code="getCustomProductsConfig.error.statusCode"
    :response="getCustomProductsConfig.error.response"
  />
</template>

<style lang="scss" scoped>
.builder {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;

  &__side {
    background: #eeeeee;
    width: 100%;
    display: block;
    flex: 1;

    @media (min-width: 960px) {
      width: 20vw;
      min-height: 100vh;
      display: block;
      flex: 1 0 20vw;
    }
  }

  &__main {
    background: #fff;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;

    @media (min-width: 960px) {
      width: 30vw;
      min-height: 100vh;
      flex: 1 0 30vw;
    }
  }

  &__preview {
    display: none;

    @media (min-width: 960px) {
      width: 50vw;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      flex: 1 0 50vw;
    }
  }
}
</style>
