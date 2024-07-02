<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
  </section>

  <div>
    <button class="btn" @click="counter++">+1</button>
    <button class="btn" v-on:click="counter--">-1</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface Props {
  value: number;
}

// Componente MyCounter debe recibir o requiere propiedad o propertie llamada "value" de tipo number
const props = defineProps<Props>();

const counter = ref(props.value); // counter es el estado. v-on:click es el evento onClick sobre un elemento. couunter tendra como valor inicial props.value
const squareCounter = computed(() => counter.value * counter.value);
</script>

<style scoped>
.btn {
  @apply p-5 bg-blue-500 rounded hover:bg-blue-700 mr-2;
}
</style>
