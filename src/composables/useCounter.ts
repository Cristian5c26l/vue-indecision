import { ref, computed } from 'vue';

export const useCounter = (initialValue: number = 5) => {
  const counter = ref(initialValue); // counter es el estado. v-on:click es el evento onClick sobre un elemento. couunter tendra como valor inicial props.value
  //   const squareCounter = computed(() => counter.value * counter.value);
  return {
    counter,

    // Read-only
    squareCounter: computed(() => counter.value * counter.value),
  };
};
