<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
const props = defineProps({
  movieId: Number,
});

// Log the movieId to ensure it's reactive
watch(() => props.movieId, (newMovieId) => {
  console.log('New movieId:', newMovieId);
});
const email = ref('');
const bookedSeats = ref(1); 
const isBookingConfirmed = ref(false);
const isModalOpen = ref(false)

watch(() => isModalOpen, (newMovieId) => {
  console.log('New movieId:', newMovieId);
});
 
    // Access movieId correctly in onMounted
    onMounted(() => {
      console.log(props.movieId); // Accessing movieId through props
    });
    const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
};
const saveChanges = () => {
  if (email.value === '' || bookedSeats.value < 1) {
    alert('Vänligen fyll i en giltig e-postadress och välj minst en biljett.');
    return;
  }
  
  isBookingConfirmed.value = true;

  console.log('E-post:', email.value);
  console.log('Antal biljetter:', bookedSeats.value);

};


// Ticket management functions
const increaseTickets = () => {
  bookedSeats.value++;
};

const decreaseTickets = () => {
  if (bookedSeats.value > 1) {
    bookedSeats.value--;
  }
};

// Reset booking function
const resetBooking = () => {
  isBookingConfirmed.value = false;
  email.value = ''; 
  bookedSeats.value = 1; 
 
};


</script>

<template>

  <div>

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
            <h4>{{ movieId }}</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Modal Body - Dynamiskt innehåll -->
          <div class="modal-body">
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

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Stäng
            </button>

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
