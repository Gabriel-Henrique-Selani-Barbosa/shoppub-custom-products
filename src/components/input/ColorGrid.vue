<script setup lang="ts">
import { IInputConfigOption, IItemColorGrid } from "@/models";
const builder = useBuilderState();

interface IInput {
  field: IItemColorGrid;
}

const props = defineProps<IInput>();
const value = ref<any>(null);

function updateValue(option: IInputConfigOption<any> | null) {
  ensure(props.field.config.options).forEach((item) => {
    if (props.field.config.allowNone) {
      item.selected = item.id === option?.id ? !item.selected : false;
      return;
    }
    item.selected = item.id === option?.id ?? false;
  });
  value.value = option;
  props.field.config.checked = props.field.config.required
    ? props.field.config.options?.some((item) => item.selected)
    : true;
  builder.setTextShadowItem(getContrastColor(option?.value))
}

onMounted(() => {
  props.field.config.checked = props.field.config.required
    ? props.field.config.options?.some((item) => item.selected)
    : true;
});
</script>

<template>
  <FormGroup :label="field.label" :classLabel="'mb-1'">
    <div class="color-grid" tabindex="0">
      <button
        v-for="(option, i) in props.field.config.options"
        class="color-grid__button"
        :class="{ selected: option.selected }"
        :key="i"
        :title="option.label"
        :disabled="option.disabled"
        @click="updateValue(option)"
      >
        <div :style="{ position: 'relative' }">
          <span class="sample" :style="{ background: option.value }">
            <font-awesome-icon icon="check" class="icon" />
          </span>
          <span
            class="label-color"
          >
            {{ option.label }}
          </span>
        </div>
      </button>
    </div>
  </FormGroup>
</template>

<style lang="scss" scoped>
.label-color {
  overflow-x: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 100%;
  margin-bottom: -5px;
  padding-left: 5px;
  padding-right: 5px;
}
.color-grid__button {
  border: 0;
  margin: 0;
  padding: 0;
  display: block;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 3px 0px rgba(204, 204, 204, 1);

  .sample {
    width: 100%;
    padding: 0 0 40px;
    display: block;
    position: relative;
    margin-bottom: -3px;

    .icon {
      color: #fff;
      font-size: 2rem;
      position: absolute;
      top: calc(50% - 1rem);
      left: calc(50% - 1rem);
      transition: 0.5s cubic-bezier(0.36, 0.06, 0.18, 1.54);
      opacity: 0;
      transform: scale(0) rotateZ(0);
    }
  }

  &:hover {
    opacity: 0.75;
  }

  &.selected {
    box-shadow: 0 0 0 0.125rem #fff, 0 0 0 0.25rem rgba(0, 0, 0, 0.5);

    .sample {
      .icon {
        opacity: 1;
        transform: scale(1) rotateZ(359deg);
      }
    }
  }
}

.color-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 3rem));
  gap: 1rem 0.7rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 960px) {
    grid-template-columns: repeat(auto-fill, minmax(5rem, 3rem));
    gap: 2rem 1rem;
  }
}
</style>
