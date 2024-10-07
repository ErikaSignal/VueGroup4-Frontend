<template>
    <div class="homepage">
        <header>
            <img :src="logo" alt="Cinema Logo" class="logo" />
        </header>

        <div class="movie-poster-header">
            <h3>Filmer vi visar nu</h3>
        </div>
        <section class="movies-grid">
            <div class="movie-poster" v-for="movie in movies" :key="movie.id">
                <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">
                    <img :src="movie.posterUrl" :alt="movie.title" />
                </router-link>
                <h3>
                    <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">
                        {{ movie.title }}
                    </router-link>
                </h3>
            </div>
        </section>
    </div>
</template>

<script>
import poster1 from '/src/img/poster1.jpg';
import poster2 from '/src/img/poster2.jpg';
import poster3 from '/src/img/poster3.jpg';

export default {
    setup() {
        const logo = './src/img/logo.png';

        const movies = [
            { id: 1, title: 'Movie 1', posterUrl: poster1 },
            { id: 2, title: 'Movie 2', posterUrl: poster2 },
            { id: 3, title: 'Movie 3', posterUrl: poster3 }
        ];

        return {
            logo,
            movies
        };
    }
};
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
</style>