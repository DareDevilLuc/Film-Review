<script setup>
import { ref } from 'vue';

function onSubmit(){
}

</script>

<template>

  <form @submit="onSubmit">
    <input type="text" placeholder="name">
    <input type="text" placeholder="message">
    <button type="submit">Submit</button>
  </form>

</template>

<style scoped></style>
