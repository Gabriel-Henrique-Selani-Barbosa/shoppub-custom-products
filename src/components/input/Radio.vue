<script setup lang="ts">
import { IItemRadio } from '@/models';

interface IInput {
  field: IItemRadio;
}

const props = defineProps<IInput>();
const value = ref<any>(ensure(props.field.config.options).find(item => item.selected)?.value || null);

const BooleanValues = {
  true: ['sim', 'yes', 'true'],
  false: ['não', 'nao', 'no', 'false']
}

onBeforeMount(() => {
  const arrayOptions = [...BooleanValues.true, ...BooleanValues.false];
  if (ensure(props.field.config.options).map(item => arrayOptions.includes(item.label.toLocaleLowerCase().replace(/[^a-zã]/g, ''))).every(item => item)) {
    ensure(props.field.config.options).filter(item => ['undefined', 'null'].includes(String(item.value))).forEach(item => {
      item.value = BooleanValues.true.includes(item.label.toLocaleLowerCase().replace(/[^a-zã]/g, '')) ? 'true' : 'false';
    })
  }
});

watch(value, () => {
  if (ensure(props.field.config.options).length > 0) {
    ensure(props.field.config.options).forEach((item) => {
      item.selected = item.value === value.value;
    });
  }
  props.field.config.checked = props.field.config.required ? !(['', null, undefined]).includes(value.value) : true;
});

onMounted(() => {
  props.field.config.checked = props.field.config.required ? !(['', null, undefined]).includes(value.value) : true;
})
</script>

<template>
  <FormGroup v-if="field.config.options" :label="`${field.label} ${field.config.required ? '*' : ''}`">
    <label v-for="(item, i) in field.config.options" :key="i" class="radio">
      <input type="radio" class="radio__input" v-model="value" :value="item.value" />
      <FontAwesomeIcon class="radio__mark" :icon="item.selected ? 'circle-dot' : 'circle'" />
      <span class="radio__text">
        {{ item.label }}
      </span>
    </label>
  </FormGroup>
</template>

<style lang="scss" scoped>
.radio__text {
  user-select: none;
  flex: 1;
}

.radio__mark {
  width: 1.2rem;
  font-size: 1.2rem;
}

.radio__input {
  display: none;
}

.radio {
  width: 100%;
  margin: 0 0 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--color-gray);
  }

  @include last-child-margin-bottom(0);
}
</style>
