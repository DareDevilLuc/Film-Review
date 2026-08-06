<script setup>
import { ref } from 'vue';


const title = ref('')
const director = ref('')
const releaseYear = ref()
const synopsis = ref('')
const films = ref([])
const reviews = ref([])
const filmId = ref('')
const deleteFilmId = ref('')
const reviewerName = ref('')
const rating = ref()
const comment = ref('')
const specificId = ref('')
const specificIdRev = ref('')

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

function deleteFilms() {
  fetch('http://localhost:3000/films/' + deleteFilmId.value, {method: 'DELETE'})
}

function getReviews() {
  fetch('http://localhost:3000/reviews')
  .then(response => {
    if(!response.ok){
      throw new Error(`Server error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  })
  .then(data => {
    if(!data){ console.log("Reviews are empty")}
    else {
      console.log(data)
      reviews.value = data

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
    releaseYear.value, synopsis: synopsis.value})
  })
  .then(response => {return response.json()})
  .then(data => console.log('Response from server: ', data.response))
  .catch(err => console.error(err))
}

function newReview() {
  fetch('http://localhost:3000/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({film: filmId.value, reviewerName: reviewerName.value, rating: rating.value, comment: comment.value})
  })
  .then(response => {return response.json()})
  .then(data => console.log('Respone from server: ', data.response))
}

function getSpecificFilm () {
  fetch('http://localhost:3000/films/' + specificId.value)
  .then(response => {return response.json()})
  .then(data => console.log(data))
}

function getSpecificReviews () {
  fetch('http://localhost:3000/reviews/' + specificIdRev.value)
  .then(response => { return response.json()})
  .then(data => console.log(data))
}

</script>

<template>

  <h1>Test</h1>
  <button @click="getFilms()">Get films</button>

  <div v-if="films.length > 0">
    <li v-for="film in films" :key="film._id">
      {{ film._id }} | {{ film.title }}
    </li>
  </div>
  <p v-else>Have not gotten films yet.</p>

  <button @click="getReviews()">Get reviews</button>

  <div v-if="reviews.length > 0">
    <li v-for="review in reviews" :key="review._id">
      {{ review.reviewerName }}: {{ review.comment }} | REVIEWED: {{ review.film.title }} | RATING = {{ review.rating }}
    </li>
  </div>
  <p v-else>Have not gotten reviews yet.</p>

  <form @submit.prevent="newFilm">
    <input v-model="title" type="text" placeholder="title">
    <input v-model="director" type="text" placeholder="director">
    <input v-model="releaseYear" type="number" placeholder="year released">
    <textarea v-model="synopsis" placeholder="synposis"></textarea>
    <button type="submit">New Film</button>
  </form>

  <form @submit.prevent="newReview">
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

  <form @submit.prevent="getSpecificReviews()">
    <input v-model="specificIdRev" placeholder="film id">
    <button type="submit">Get specific reviews</button>
  </form>

  <form @submit.prevent="deleteFilms()">
    <input v-model="deleteFilmId" placeholder="film id">
    <button type="submit">Delete specific film</button>
  </form>

</template>

<style scoped></style>
