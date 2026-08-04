<script setup>
import { ref } from 'vue';

const title = ref('')
const director = ref('')
const releaseYear = ref()
const synposis = ref('')

function getFilms() {
  fetch('http://localhost:3000/films')
  .then(response => {
    if(!response.ok){
      throw new Error(`Server error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  })
  .then(data => {
    if(!data){ console.log("Films are empty")}
    else { console.log(data) }
  })
  .catch(err => {
    console.error(err)
  })
}

function newFilm() {
  fetch('http://localhost:3000/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title : title.value, director: director.value, releaseYear :
    releaseYear.value, synposis: synposis.value})
  })
  .then(response => {return response.json()})
  .then(data => console.log('Response from server: ', data.response))
  .catch(err => console.error(err))
}

</script>

<template>

  <h1>Test</h1>
  <button @click="getFilms()">Get films</button>

  <form @submit.prevent="newFilm">
    <input v-model="title" type="text" placeholder="title">
    <input v-model="director" type="text" placeholder="director">
    <input v-model="releaseYear" type="number" placeholder="year released">
    <textarea v-model="synposis" placeholder="synposis"></textarea>
    <button type="submit">New Film</button>
  </form>

</template>

<style scoped></style>
