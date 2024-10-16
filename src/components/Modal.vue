<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOneMovie } from '../services/api.js';

// Reaktiva variabler för e-post, antal biljetter och bokningsstatus
const email = ref('');
const bookedSeats = ref(1); 
const isBookingConfirmed = ref(false); // Variabel för att avgöra om bokningen är bekräftad
const title = ref(''); //Titel från API


// Funktion för att hämta titel från API
const route = useRoute();
const fetchMovie = async () => {
  try {
    const movieData = await getOneMovie(route.params.id);
    title.value = movieData.title;
  } catch (error) {
    console.error('Kunde inte hämta filmtiteln:', error);
  }
};

// Anropa fetchMovie när komponenten monteras
onMounted(() => {
  fetchMovie();
});

// Funktion för att spara ändringarna 
const saveChanges = () => {
  if (email.value === '' || bookedSeats.value < 1) {
    alert('Vänligen fyll i en giltig e-postadress och välj minst en biljett.');
    return;
  }

  // Sätt bokningsstatus till bekräftad
  isBookingConfirmed.value = true;

  // Här kan du skicka eller spara datan
  console.log('E-post:', email.value);
  console.log('Antal biljetter:', bookedSeats.value);
};

//Lägg till biljetter
const increaseTickets = () => {
  bookedSeats.value++;
};

//Minska antal biljeter
const decreaseTickets = () => {
  if (bookedSeats.value > 1) {
    bookedSeats.value--;
  }
};

// Funktion för att återställa bokningsstatus
const resetBooking = () => {
  isBookingConfirmed.value = false;
  email.value = ''; 
  bookedSeats.value = 1; 
};
</script>

<template>
  <div>
    <!-- Knapp för att öppna modalen -->
    <button
      type="button"
      class="btn btn-warning btn-lg"
      data-bs-toggle="modal"
      data-bs-target="#exampleModalCenter"
      @click="resetBooking"
    >
      Boka
    </button>

    <!-- Modal -->
    <div
      class="modal fade text-dark"
      id="exampleModalCenter"
      tabindex="-1"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              Boka {{ title }} kl.18:00
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Modal Body - Dynamiskt innehåll -->
          <div class="modal-body">
            <!-- Visa formulär om bokningen inte är bekräftad -->
            <div v-if="!isBookingConfirmed">
              <div class="form-group mb-3">
                <label for="email">Email adress:</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Skriv din e-postadress"
                />
              </div>

              <div class="form-group mb-3">
                <label for="bookedSeats">Antal biljetter:</label>
                <div class="input-group">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="decreaseTickets"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    class="form-control text-center"
                    id="bookedSeats"
                    v-model="bookedSeats"
                    min="1"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="increaseTickets"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- Visa bekräftelsemeddelande om bokningen är bekräftad -->
            <div v-else>
              <p>Tack för din bokning!</p>
              <p>
                <strong>E-post:</strong> {{ email }}
              </p>
              <p>
                <strong>Antal biljetter:</strong> {{ bookedSeats }}
              </p>
            </div>
          </div>

          <!-- Modal Footer - Dynamisk knapp beroende på bokningsstatus -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Stäng
            </button>

            <!-- Visa "Bekräfta bokning" om bokningen inte är klar -->
            <button
              v-if="!isBookingConfirmed"
              type="button"
              class="btn btn-primary"
              @click="saveChanges"
            >
              Bekräfta bokning
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Stil för input-fältet för antal biljetter */
.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin: 0 auto;
}

input[type="number"] {
  max-width: 60px;
  text-align: center;
}
</style>
