<script setup lang="ts">
interface IULoader {
  labelList?: boolean;
}
const props = defineProps<IULoader>();

const strings = ref([
  "Aguarde um momento, estamos quase lá...",
  "Estamos preparando tudo para você. Só mais um instante...",
  "Fique tranquilo, estamos trabalhando nos bastidores...",
  "Enquanto espera, você lembrou de se hidratar hoje? Que tal um pouco de água?",
  "Isso esta demorando um pouco mais do que imaginamos...",
  "Só mais um pouco, estamos quase prontos para você."
]);
const currentIndex = ref(0);
const currentString = ref(strings.value[0]);

const showNextString = () => {
  if (currentIndex.value < strings.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  currentString.value = strings.value[currentIndex.value];
};

const intervalMilliseconds = 5000;

onMounted(() => {
  setInterval(showNextString, intervalMilliseconds);
});

</script>

<template>
  <div class="loader">
    <div>
      <FontAwesomeIcon class="loader__icon" icon="spinner" fixed-width />
    </div>
    <br/>
    <div v-if="props.labelList">
      {{ currentString }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes loader-blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  background: #e0e0e0;
  width: 100%;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-template-rows: min-content min-content;
  align-content: center;

  &__icon {
    font-size: 5rem;
    animation: loader-spin 2s linear infinite, loader-blink 1s linear infinite;
  }
}
</style>
