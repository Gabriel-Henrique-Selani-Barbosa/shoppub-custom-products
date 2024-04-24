function debouncer<T extends (...args: any[]) => void>(fn: T, delay: number): () => void {
    let timeoutID: NodeJS.Timeout | undefined = undefined;
  
    return function (this: HTMLElement, ...args: Parameters<T>) {
      clearTimeout(timeoutID);
      const that = this;
      timeoutID = setTimeout(() => {
        fn.apply(that, args);
      }, delay);
    };
  }
  
  export default function debounce(el: HTMLElement, binding: { value: string; oldValue: string }) {
    if (binding.value !== binding.oldValue) {
      el.oninput = debouncer(function (this: HTMLElement) {
        el.dispatchEvent(new Event('change'));
      }, parseInt(binding.value) || 500);
    }
  }
  