<template>
  <div class="background">

    <header class="d-flex justify-content-center justify-content-md-start pb-5">
      <RouterLink to="/"><img src="@/assets/logo.png" alt="logo" width="200"></RouterLink>
    </header>

    <!-- Film Information Section -->
    <section class="container-lg">
      <div v-if="post" class="row">

        <img class="col-md-3 col-12 "
          src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png"
          alt="Movie Poster" width="200">

        <div class="col-md col-12 d-flex flex-column">
          <h2>{{ post.title }}</h2>
          <div class="flex-grow-1">
            <p class="fs-4">{{ post.opening_crawl }}</p>
          </div>
        </div>
        <div class="col-md col-11 d-flex flex-column custom-border mx-auto custom-bg">
          <div style="height: 2.5rem;"></div>
          <div class="flex-grow-1">
            <p class="fs-4 fw-bold">Utgivningsdatum: {{ post.release_date }}</p>
            <p class="fs-4 fw-bold">Producent: {{ post.producer }}</p>
            <p class="fs-4 fw-bold">Regissör: {{ post.director }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Visning Information Section -->
    <section v-for="(film, index) in filmer" :key="index" class="container py-4 ">

      <h3>{{ formatDate(film.bookingTime) }}</h3>

      <div  class="row custom-height col-md col-11 m-auto rounded border mb-5 pb-md-0 pb-4 w-100">

        <img class="col-md col-12 p-4 "
          src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png"
          alt="Movie Poster" height="180">

        <div class="col-md col-12 d-flex flex-column justify-content-center align-items-center">
          <p v-if="post" class="fs-2">{{ post.title }}</p>
          <p class="fs-4">{{ formatTime(film.bookingTime) }}</p>

        </div>
        <div 
          class="col-md col-12 d-flex justify-content-center align-items-center">
          <p v-if="filmer.length > 0" class="fs-5">
            Platser kvar: {{ film.totalSeats - film.bookedSeats }} av {{ film.totalSeats }}
          </p>
          <p v-else>
            Laddar bokningsinformation...
          </p>
        </div>
        <div class="col-md col-12 d-flex justify-content-center align-items-center">

<ModalComponent :movieId="film.bookingId" />
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOneMovie } from '../services/api.js'
import ModalComponent from '../components/Modal.vue'
import { onMounted } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081/api';

const filmer = ref([]);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('sv-SE', options);
  return capitalizeFirstLetter(formattedDate);
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const fetchFilmer = async () => {
  try {
    const response = await axios.get(`/swapi/${route.params.id}`);
    filmer.value = response.data;
    console.log("Filmer:", filmer.value);
  } catch (error) {
    console.error("Kunde inte hämta filmer:", error);
  }
};


onMounted(() => {
  fetchFilmer();
});

const route = useRoute()
const post = ref(null)
const error = ref(null)
const loading = ref(false)
watch(() => route.params.id, fetchData, { immediate: true })
async function fetchData() {
  loading.value = true
  post.value = null
  error.value = null
  try {
    post.value = await getOneMovie(route.params.id)
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
<script>
import { RouterLink, RouterView } from 'vue-router'
/*  export default {
    name: "MovieBooking",
    data() {
      return {
        totalSeats: 10,
        bookedSeats: 6, // Hårdkodade bokade platser
      };
    },
    computed: {
      availableSeats() {
        return this.totalSeats - this.bookedSeats;
      },
    },
    methods: {
      bookSeat() {
        //inget händer atm
      },
    },
  };
  */
</script>

<style scoped>
.mt-2 {
  margin-bottom: 3rem;
}

.background {
  background-image: url('@/assets/bg-pic3.png');
  background-size: cover;
  background-position: center;
  min-height: 100%;
  min-width: 100%;
  color: white;
  padding: 0;
}

.custom-border {
  border-radius: 30px;
}


.custom-bg {
  background-color: rgba(117, 118, 126, 0.35);
}
</style>