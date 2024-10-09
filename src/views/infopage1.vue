<template>
    <div class="background">
      
      <header class="d-flex justify-content-center justify-content-md-start pb-5">
        <RouterLink to="/"><img src="@/assets/logo.png" alt="logo" width="200"></RouterLink>
      </header>
  
      <!-- Film Information Section -->
      <section class="container-lg">
      <div class="row">
       
          <img class="col-md-3 col-12 " src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png" alt="Movie Poster" width="200">
    
    <div class="col-md col-12 d-flex flex-column">
    <h2>Titel</h2>
    <div class="flex-grow-1">
    <p class="fs-4">Info om filmen</p> 
    </div>
     </div>
<div class="col-md col-11 d-flex flex-column custom-border mx-auto custom-bg">
  <div style="height: 2.5rem;"></div> 
  <div class="flex-grow-1">
          <p class="fs-4 fw-bold">Utgivningsdatum:</p>
          <p class="fs-4 fw-bold">Producent:</p>
          <p class="fs-4 fw-bold">Regissör:</p>
        </div>
      </div>
    </div>
  </section>

  
      <!-- Visning Information Section -->
      <section class="container py-4 ">
        <h3>Torsdag 10 Oktober</h3>
          <div class="row custom-height col-md col-11 m-auto rounded border mb-5 pb-md-0 pb-4 w-100">
          
            <img class="col-md col-12 p-4 " src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png" alt="Movie Poster" height="180">
         
          <div class="col-md col-12 d-flex flex-column justify-content-center align-items-center" >
            <p class="fs-2">Titel</p>
            <p class="fs-4">Kl 18:00</p>
            
          </div>
          <div class="col-md col-12 d-flex justify-content-center align-items-center" >
            <p class="fs-4">Platser kvar: {{ totalSeats-bookedSeats }} av {{ totalSeats }}</p>
          </div>
          <div class="col-md col-12 d-flex justify-content-center align-items-center" >

          <button @click="bookSeat" type="button" class="btn btn-warning btn-lg">BOKA</button>

          </div>

      </div>
      <h3>Onsdag 16 Oktober</h3>
            
        <div class="row custom-height col-md col-11 m-auto rounded border mb-5 pb-md-0 pb-4 w-100">
          
            <img class="col-md col-12 p-4 " src="https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw79144a0d/images/5/2/4/3/524369a.jpg?sw=350&sh=400&sm=fit&sfrm=png" alt="Movie Poster" height="180">
         
          <div class="col-md col-12 d-flex flex-column justify-content-center align-items-center" >
            <p class="fs-2">Titel</p>
            <p class="fs-4">Kl 19:15</p>
            
          </div>
          <div class="col-md col-12 d-flex justify-content-center align-items-center" >
            <p class="fs-4">Platser kvar: {{ totalSeats-bookedSeats }} av {{ totalSeats }}</p>
          </div>
          <div class="col-md col-12 d-flex justify-content-center align-items-center" >

          <button @click="bookSeat" type="button" class="btn btn-warning btn-lg">BOKA</button>

          </div>

      </div>
      </section>
    </div>
  </template>
  
  <script>
  import { RouterLink, RouterView } from 'vue-router'
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
  .mt-2{
    margin-bottom:3rem;
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
  