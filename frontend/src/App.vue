<script setup>
import { ref } from 'vue';

const title = ref('')
const director = ref('')
const releaseYear = ref()
const synposis = ref('')
const films = ref([])
const filmId = ref('')
const reviewerName = ref('')
const rating = ref()
const comment = ref('')
const specificId = ref('')

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
    else {
      console.log(data)
      films.value = data

    }
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

function getSpecificFilm () {
  fetch('http://localhost:3000/films/' + specificId.value)
  .then(response => {return response.json()})
  .then(data => console.log(data))
}

</script>

<template>

  <h1>Test</h1>
  <button @click="getFilms()">Get films</button>

  <div v-if="films.length > 0">
    <li v-for="film in films" :key="film._id">
      {{ film._id }}
    </li>
  </div>
  <p v-else>Have not gotten films yet.</p>

  <form @submit.prevent="newFilm">
    <input v-model="title" type="text" placeholder="title">
    <input v-model="director" type="text" placeholder="director">
    <input v-model="releaseYear" type="number" placeholder="year released">
    <textarea v-model="synposis" placeholder="synposis"></textarea>
    <button type="submit">New Film</button>
  </form>

  <form @submit.prevent="">
    <input v-model="filmId" type="text" placeholder="id">
    <input v-model="reviewerName" type="text" placeholder="reviewer's name">
    <input v-model="rating" type="number" placeholder="rating">
    <textarea v-model="comment" placeholder="comment"></textarea>
    <button type="submit">New Review</button>
  </form>

  <form @submit.prevent="getSpecificFilm">
    <input v-model="specificId" placeholder="film id">
    <button type="submit">Get specific film</button>
  </form>

</template>

<style scoped></style>
