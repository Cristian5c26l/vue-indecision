<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
  </section>

  <div>
    <button @click="counter++">+1</button>
    <button v-on:click="counter--">-1</button>
  </div>
</template>

<script lang="ts" src="./MyCounterScript2"></script>
