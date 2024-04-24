<script setup lang="ts">
interface IInput {
  field: any;
}

onMounted(() => {
  props.field.config.checked = true;
});

const props = defineProps<IInput>();
</script>

<template>
  <FormGroup v-if="props.field.infos">
    <label v-for="(item, i) in props.field.infos" :key="i">
      <p class="text__info">
        {{ item.trim() }}
      </p>
    </label>
  </FormGroup>
</template>

<style lang="scss" scoped>
.text__info {
  color: var(--color-secondary);
  font-size: 1rem;
  text-align: center;
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 1rem;
  display: block;
}
</style>
