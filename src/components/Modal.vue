<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081/api';
const props = defineProps({
  movieId: Number,
  title: String,
  filmId: Number,
});

const email = ref('');
const requestedSeats = ref(1); 
const isBookingConfirmed = ref(false);


// Hantera modalen med Bootstrap's event för att återställa bokningen vid öppning
onMounted(() => {
  const modalElement = document.getElementById('exampleModalCenter');

  // Återställ modalen varje gång den öppnas
  modalElement.addEventListener('show.bs.modal', () => {
    resetBooking();
  });
});

const updateBooking = async () => {
  try {
    const bookingId = props.filmId;// Replace with the correct booking ID
    const updatedBooking = {
      bookedSeats: requestedSeats.value // Skicka antal bokade platser som ett objekt
    };

    console.log(bookingId)

    // Skicka hela objektet istället för bara requestedSeats.value
    const response = await axios.patch(`/booking/${bookingId}`, updatedBooking);
    console.log('Bokningen har uppdaterats:', response.data);
  } catch (error) {
    console.error('Det gick inte att uppdatera bokningen:', error);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('sv-SE', options);

};



const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  
};

const saveChanges = () => {
  if (email.value === '' || requestedSeats.value < 1) {
    alert('Vänligen fyll i en giltig e-postadress och välj minst en biljett.');
    return;
  }
  
  isBookingConfirmed.value = true;
  console.log('E-post:', email.value);
  console.log('Antal biljetter:', requestedSeats.value);
  updateBooking()
};

// Hantera biljetter
const increaseTickets = () => {
  requestedSeats.value++;
};

const decreaseTickets = () => {
  if (requestedSeats.value > 1) {
    requestedSeats.value--;
  }
};

// Funktion för att återställa bokningen
const resetBooking = () => {
  isBookingConfirmed.value = false;
  email.value = ''; 
  requestedSeats.value = 1; 
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


            <h4> {{ props.title }}  {{ formatDate(movieId )}} {{ formatTime(movieId )}}</h4>
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
                <label for="requestedSeats">Antal biljetter:</label>
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
                    id="requestedSeats"
                    v-model="requestedSeats"
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
                <strong>Antal biljetter:</strong> {{ requestedSeats }}
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
