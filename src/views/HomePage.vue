<template>
    <div class="homepage">
      <header>
        <img :src="logo" alt="Cinema Logo" class="logo" />
      </header>
  
      <section class="movies-grid">
        <div class="movie-poster" v-for="movie in movies" :key="movie.id">
          <img :src="movie.posterUrl" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import poster1 from '/src/img/poster1.jpg';
  import poster2 from '/src/img/poster 2.jpg';
  import poster3 from '/src/img/poster 3.jpg';
  
  export default {
    setup() {
      const logo = './src/img/logo.png'; // Din logga
  
      // Lokalt lagrade filmposters
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
  }
  
  .logo {
    max-width: 800px;
    margin-bottom: 100px;
  }
  
  .movies-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .movie-poster {
    flex-basis: 30%;
    text-align: center;
  }
  
  .movie-poster img {
    max-width: 100%;
    border-radius: 10px;
  }
  
  .movie-poster h3 {
    margin-top: 10px;
  }
  </style>
  