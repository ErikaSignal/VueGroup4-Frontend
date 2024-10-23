<template>
  <div class="background">
    <header class="d-flex justify-content-center justify-content-md-start pb-5">
      <RouterLink to="/"><img src="@/assets/logo.png" alt="logo" width="200"></RouterLink>
    </header>

    <!-- Film Information Section -->
    <section class="container-lg">
      <div v-if="post" class="row">
        <img class="poster-large col-md-3 col-12" :src="getPosterById(route.params.id)" alt="Movie Poster">

        <div class="col-md col-12 d-flex flex-column">
          <h2>{{ post.title }}</h2>
          <div class="flex-grow-1">
            <p class="fs-4">{{ post.opening_crawl }}</p>
          </div>
        </div>
        <div class="col-md col-11 d-flex flex-column custom-border mx-auto custom-bg">
          <div style="height: 2.5rem;"></div>
          <div class="flex-grow-1">
            <p class="fs-4"><strong> Utgivningsdatum:</strong> {{ post.release_date }}</p>
            <p class="fs-4"><strong>Producent:</strong> {{ post.producer }}</p>
            <p class="fs-4 "><strong>Regissör:</strong> {{ post.director }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Laddar...</div>
    </section>

    <!-- Visning Information Section -->
    <section v-if="post" v-for="(film, index) in filmer" :key="index" class="container py-4 " :id="film.bookingId">
      <h3>{{ formatDate(film.bookingTime) }}</h3>

      <div class="row custom-height col-md col-11 m-auto rounded border mb-5 pb-md-0 pb-4 w-100">
        <img class="poster-small col-md col-12 p-4" :src="getPosterById(route.params.id)" alt="Movie Poster">

        <div class="col-md col-12 d-flex flex-column justify-content-center align-items-center">
          <p  class="fs-2">{{ post.title }}</p>
          <p class="fs-4">{{ formatTime(film.bookingTime) }}</p>
        </div>
        <div class="col-md col-12 d-flex justify-content-center align-items-center">
          <p v-if="filmer.length > 0" class="fs-5">
            Platser kvar: {{ film.totalSeats - film.bookedSeats }} av {{ film.totalSeats }}
          </p>
          <p v-else>
            Laddar bokningsinformation...
          </p>
        </div>
        <div class="col-md col-12 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-warning btn-lg" data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter" @click="setFilmDetails(film.bookingTime, film.bookingId)">
            Boka
          </button>
        </div>
      </div>

      <!-- Modal Component -->
      <ModalComponent :movieTime="movieTime" :title="post.title" :filmId="currentFilmId"
        @reload-parent="reloadParent" />
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ModalComponent from '../components/Modal.vue';
import { reactive } from 'vue';
import { getOneMovie } from '../services/api.js';
import { posters } from '@/services/utils/json.js';
import { formatTime, formatDate } from '@/services/utils/dateUtils';
import { fetchFilmer } from '@/services/database.js';

const state = reactive({ count: 0 });
const filmer = ref([]);
const route = useRoute();
const post = ref(null);
const error = ref(null);
const loading = ref(false);

// Hämta filmer och uppdatera sidan
onMounted(() => {
  fetchFilmerFromDb();
});

const reloadParent = () => {
  state.count++; // Öka räknaren för att trigga en omhämtning av data
};

// Watch-funktion för att hämta ny data när `state.count` ändras
watch(() => state.count, async () => {
  await fetchFilmerFromDb(); // Hämta uppdaterad information från API
});

const fetchFilmerFromDb = async () => {
  try {
    filmer.value = await fetchFilmer(route.params.id);
  } catch (err) {
    console.error("Kunde inte hämta filmer");
  } finally {
    loading.value = false;
  }
}

// Hämta en film baserat på route params
watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData() {
  loading.value = true;
  post.value = null;
  error.value = null;
  try {
    post.value = await getOneMovie(route.params.id);
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

// Funktion för att returnera rätt poster baserat på film-ID
const getPosterById = (id) => {
  const poster = posters.find((p) => p.id === parseInt(id));
  return poster ? poster.posterUrl : ''; 
};


// Spara movieId och filmId för modalen
const movieTime = ref(null);
const currentFilmId = ref(null);

const setFilmDetails = (time, id) => {
  movieTime.value = time;
  currentFilmId.value = id;
};

</script>

<style scoped>
.mt-2 {
  margin-bottom: 3rem;
}

.background {
  background-image: url('@/assets/bg-pic3.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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

.poster-large {
  width: auto;
  height: 500px;
}

.poster-small {
  width: auto;
  height: 250px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .poster-small {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
}
</style>
