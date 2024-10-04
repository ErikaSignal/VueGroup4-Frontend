<template>
    <div>
      <!-- Header -->
      <header>
        <h1>Lokal Bion</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ev2qwQr3dLdIbWpQMn0DtFc5aeLBCFxVXg&s" alt="Lokal Bion logo" width="125" height="125">
      </header>
  
      <!-- Film Information Section -->
      <section>
        <div>
          <img src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png" alt="Movie Poster" width="200">
        </div>
        <div>
          <h2>Titel</h2>
          <p>Info om filmen</p>
        </div>
        <div>
          <p>Genre: Sci-fi</p>
          <p>Åldersgräns: 11 år</p>
          <p>Skådespelare:</p>
          <p>Regissör:</p>
          <p>Längd:</p>
          <p>Producer:</p>
          <p>Release date:</p>
        </div>
      </section>
  
      <!-- Visning Information Section -->
      <section>
        <h3>Torsdag 03 Oktober</h3>
        <div>
          <div>
            <img src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png" alt="Movie Poster" width="100">
          </div>
          <div>
            <p>Kl 18:00</p>
            <p>Titel</p>
          </div>
          <div>
            <p>Platser kvar: {{ totalSeats-bookedSeats }} av {{ totalSeats }}</p>
          </div>
          <div>
            <button @click="bookSeat">BOKA</button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
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
  </script>
  
  <style scoped>
  /* Du kan lägga till CSS här om du vill styla komponenten */
  </style>
  