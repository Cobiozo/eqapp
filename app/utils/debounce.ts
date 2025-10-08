export default function debounce(func: Function, interval: number) {
  let timeout: null | ReturnType<typeof setTimeout> = null;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, interval || 200);
  }
}