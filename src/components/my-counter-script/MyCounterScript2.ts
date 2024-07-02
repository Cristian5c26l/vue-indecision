import { useCounter } from '@/composables/useCounter';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: { type: Number, required: true },
  },
  setup(props) {
    const { counter, squareCounter } = useCounter(props.value); // counter es el estado. v-on:click es el evento onClick sobre un elemento. couunter tendra como valor inicial props.value

    return {
      counter, // counter: counter
      squareCounter,
    };
  },
});
