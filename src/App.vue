<template>
  <h1 className="text-3xl font-bold underline">Hello world!</h1>
  <hr />

  <MyCounter :value="1" />
  <MyCounterScr :value="2" />
  <MyCounterScr2 :value="3" />
</template>

<script lang="ts" setup>
import MyCounter from './components/MyCounter.vue';
import MyCounterScr from './components/MyCounterScript.vue';
import MyCounterScr2 from './components/my-counter-script/MyCounterScript2.vue';
</script>
