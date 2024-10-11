<template>
    <div class="homepage">
        <header class="text-center mb-4">
            <img :src="logo" alt="Cinema Logo" class="logo img-fluid" />
        </header>

        <div class="movie-poster-header">
            <h3>Filmer vi visar nu</h3>
        </div>

        <div class="row movies-grid">
            <div class="col-md-4 movie-poster" v-for="movie in movies" :key="movie.id">
                <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">
                    <img :src="movie.posterUrl" :alt="movie.title" class="img-fluid" />
                </router-link>
                <h3>
                    <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">
                        {{ movie.title }}
                    </router-link>
                </h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import poster1 from '/src/img/poster1.jpg';
import poster2 from '/src/img/poster2.jpg';
import poster3 from '/src/img/poster3.jpg';

const logo = './src/img/logo.png';

const movies = ref([
    { id: 1, title: 'Movie 1', posterUrl: poster1 },
    { id: 2, title: 'Movie 2', posterUrl: poster2 },
    { id: 3, title: 'Movie 3', posterUrl: poster3 }
]);

const fetchMovies = async () => {
    const apiUrls = [
        'https://www.swapi.tech/api/films/1',
        'https://www.swapi.tech/api/films/2',
        'https://www.swapi.tech/api/films/3'
    ];

    try {
        const responses = await Promise.all(apiUrls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        movies.value[0].title = data[0].result.properties.title;
        movies.value[1].title = data[1].result.properties.title;
        movies.value[2].title = data[2].result.properties.title;
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
};

onMounted(() => {
    fetchMovies();
});
</script>

<style scoped>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-image: url('/src/img/background.png');
}

.logo {
    max-width: 1500px;
    margin-bottom: 50px;
}

.movies-grid {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    padding-left: 60px;
    padding-right: 60px;
}

.movie-poster {
    flex-basis: 27%;
    text-align: left;
}

.movie-poster img {
    height: 500px;
    width: auto;
    object-fit: cover;
    max-width: 100%;
}

.movie-poster h3 {
    margin-top: 10px;
    padding-bottom: 100px;
}

.movie-poster-header {
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
    padding-left: 60px;
}

.movie-poster-header h3 {
    color: yellow;
}

a {
    color: yellow;
    text-decoration: none;
}

a:hover {
    color: rgb(255, 255, 255);
    text-decoration: underline;
}

@media (max-width: 767px) {
    .logo {
        max-width: 90%;
        height: auto;
    }

    .movies-grid {
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
    }

    .movie-poster {
        flex-basis: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .movie-poster img {
        width: 80%;
        height: auto;
    }

    .movie-poster h3 {
        margin-top: 10px;
        padding-bottom: 10px;
    }

    .movie-poster-header {
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
    }
}
</style>