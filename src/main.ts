import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCheck,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faCircle,
  faCircleCheck,
  faCircleDot,
  faCirclePlay,
  faCircleXmark,
  faSearch,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Main from '@/App.vue';
import '@/assets/scss/main.scss';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VueCookies from 'vue-cookies';
import debounce from './utils/debounce';

library.add(
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faCheck,
  faCircle,
  faCircleCheck,
  faCircleDot,
  faCirclePlay,
  faCircleXmark,
  faSearch,
  faSpinner,
  faTimes
);

const pinia = createPinia();
const app = createApp(Main);

app.directive('debounce', (el, binding) => debounce(el, binding))

const builder = document.querySelector("#builder-app");
const rootUrl = builder?.getAttribute("data-root-url") || "";

console.log(rootUrl);

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(pinia)
  .use(VueCookies)
  .use(Vue3Toastify, {
    autoClose: 3000,
    multiple: false,
  } as ToastContainerOptions)
  .use(router)
  .mount('#builder-app');
