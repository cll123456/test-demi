<template>
  <div>
    <button @click="getStatus">获取状态</button>
    <button @click="reset">重置</button>
  </div>
  <div>
    <slide-validator :key="keys" width="300px" :slider-success-style="{backgroundColor: 'lightgreen'}" :success-bg-color="'#ccc'" ref="sliderRef"></slide-validator>
  </div>
</template>

<script setup>
import slideValidator from "@test-demi/slideValidator"
import "@test-demi/slideValidator/index.css"
import { ref } from 'vue'

const sliderRef = ref(null);
const keys = ref(0);

const getStatus = () => {
  console.log(sliderRef)
  alert(sliderRef.value.slideValidatorStatus)
}

const reset = () => {
  keys.value = Date.now();
}



</script>

<style>
div{
  line-height: 50px;
}
</style>