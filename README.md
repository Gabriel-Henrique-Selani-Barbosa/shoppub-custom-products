# Product Builder

> Customizador de produto ShopPub, usando Vue 3 + Vite + TypeScript.

## Features

- Auto imports de componentes, com base na estrutrua, sem necessidade de `import` manual:
  ```
  src/components/Hello.vue            ->      <Hello />
  src/components/ui/Demo.vue          ->      <UiDemo />
  src/components/ui/form/Input.vue    ->      <UiFormInput />
  ```
- Auto import de `composables`, `utils` e, também, `store`:
  ```js
  const store = useAppState(); // Import automático de `src/store`
  const store = useApp(); // Import automático de `src/composables`
  clamp(1, 0, 30); // Import automático de `src/utils`
  ```
- Auto import de partials SCSS para `_functions`, `_mixins` e `_variables`:
  ```scss
  .xpto {
    // Não precisa importar `$font-family` de `src/assets/scss/_variables.scss`
    font-family: $font-family;
  }
  ```
- **FontAwesome**, porém sem autoimport de ícones, para evitar que o bundle fique muito grande:
  ```html
  <template>
    <!-- RTFM: https://fontawesome.com/docs/web/use-with/vue/ -->

    <FontAwesomeIcon icon="nome-do-icone" />

    <font-awesome-icon icon="nome-do-icone" />
  </template>
  ```

-----

_&copy;2022 ShopPub_
