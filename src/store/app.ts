import { IAppState, IBuilder } from '@/models';
import { defineStore } from 'pinia';

export const useAppState = defineStore('$builder:app', {
  state(): IAppState {
    return {
      config: {
        dark: false,
        mobile: false,
      },
      data: null,
      previewsTags: [],
      initialized: false,
    };
  },
  getters: {},
  actions: {
    async initialize(data: IBuilder) {
      if (typeof window === 'undefined') {
        setTimeout(() => {
          this.initialize(data);
        }, 100);

        return;
      }

      this.testDarkMode();
      this.updateMobile();

      this.data = structuredClone(data);
      this.initialized = true;
    },
    testDarkMode() {
      this.toggleDarkMode(
        window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    },
    toggleDarkMode(force?: boolean) {
      this.config.dark = typeof force === 'boolean' ? force : !this.config.dark;
    },
    updateMobile() {
      if (window.innerWidth >= 992 && this.config.mobile) {
        this.config.mobile = false;
      }

      if (window.innerWidth < 992 && !this.config.mobile) {
        this.config.mobile = true;
      }
    },
  },
});
