import { defineStore } from 'pinia';
import { IBuilderState, IItemImageGroup, IItemImage } from '@/models';
import { toast } from 'vue3-toastify';

export const useBuilderState = defineStore('$builder:builder', {
  state(): IBuilderState<Record<string, any>> {
    return {
      config: {},
      product: null,
      step: 0,
      buildImages: true,
      steps: [],
      imagesList: [],
      loading: false,
      windowMobilePreviewWidth: 0,
      windowMobilePreviewHeight: 0,
      devicePixelRatio: 0,
      finishMethod: () => { },
      imageSelected: null,
      textShadow: ''
    };
  },

  getters: {
    isStartPage(): boolean {
      return this.step < 0;
    },
    isFinishPage(): boolean {
      return this.step >= this.steps.length;
    }
  },

  actions: {
    setStep(step: number) {
      if (this.step < this.steps.length && !this.steps[this.step]?.config?.checked) {
        toast.error('Um ou mais itens obrigatórios não foram informados. Por favor, informe-os antes de passar para o passo selecionado.', {
          autoClose: 3000,
          theme: "colored"
        })
        return
      }
      this.step = step;
    },
    setImageSelected(item: IItemImageGroup | IItemImage | null) {
      if (item?.id !== this.imageSelected?.id) { this.imageSelected = item }
    },
    nextStep() {
      if (this.step < this.steps.length && !this.steps[this.step]?.config?.checked) {
        toast.error('Um ou mais itens obrigatórios não foram informados. Por favor, informe-os antes de passar para o próximo passo.', {
          autoClose: 3000,
          theme: "colored"
        })
        return
      }
      this.step = clamp(this.step + 1, 0, this.steps.length + 1);
    },
    prevStep() {
      if (this.step < this.steps.length && !this.steps[this.step]?.config?.checked) {
        toast.error('Um ou mais itens obrigatórios não foram informados. Por favor, informe-os antes de passar para o passo anterior.', {
          autoClose: 3000,
          theme: "colored"
        })
        return
      }
      this.step = clamp(this.step - 1, 0, this.steps.length - 1);
    },
    setTextShadowItem(item: string) {
      this.textShadow = item;
    }
  },
});
