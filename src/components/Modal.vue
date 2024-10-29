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
            <h4> {{ props.title }}  {{ formatDate(movieTime )}} kl. {{ formatTime(movieTime )}}</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div v-if="!isBookingConfirmed">
              <div class="form-group mb-3">
                <label for="email">Email adress:</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Skriv din e-postadress" />
              </div>

              <div class="form-group mb-3">
                <label for="requestedSeats">Antal biljetter:</label>
                <div class="input-group">
                  <button class="btn btn-outline-secondary" type="button" @click="decreaseTickets">-</button>
                  <input type="number" class="form-control text-center" id="requestedSeats" v-model="requestedSeats" min="1" readonly />
                  <button class="btn btn-outline-secondary" type="button" @click="increaseTickets">+</button>
                </div>
              </div>
            </div>

          <div v-else>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
          <div v-else>
          <div v-if="isBookingSuccessful">
            <p>Tack för din bokning!</p>
            <p><strong>E-post:</strong> {{ email }}</p>
            <p><strong>Antal biljetter:</strong> {{ requestedSeats }}</p>
          </div>
          </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>
            <button v-if="!isBookingConfirmed" type="button" class="btn btn-primary" @click="saveChanges">Bekräfta bokning</button>
          </div>
        </div>
      </div>
      </div> 
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatTime, formatDate } from '@/services/utils/dateUtils';
import { updateBookingFromDb } from '@/services/database';

const props = defineProps({
  movieTime: Number,
  title: String,
  filmId: Number,
});

const email = ref('');
const requestedSeats = ref(1); 
const isBookingConfirmed = ref(false);
const emit = defineEmits(['reload-parent']);
const errorMessage = ref('');
const isBookingSuccessful = ref(false);


// Hantera modalen med Bootstrap's event för att återställa bokningen vid öppning
 onMounted(() => {
  const modalElement = document.getElementById('exampleModalCenter');
  if (modalElement) {
    modalElement.addEventListener('show.bs.modal', () => {
      resetBooking();
    });
  }
});



const updateBooking = async () => {
  try {
    const response = await updateBookingFromDb(props.filmId, requestedSeats.value);
    if (response.status === 200) {
      emit('reload-parent');
      isBookingSuccessful.value = true;
      isBookingConfirmed.value = true;
      errorMessage.value = '';
    }
  } catch (error) {
    console.error('Ett fel inträffade vid bokning:', error);
    if (error.response && error.response.status === 400) {
      errorMessage.value = 'Inte tillräckligt med platser tillgängliga.'; 
    } else {
      errorMessage.value = 'Ett oväntat fel inträffade, försök igen senare.';
    }
    isBookingSuccessful.value = false;
  }
};


const saveChanges = async () => {
  if (email.value === '' || requestedSeats.value < 1) {
    alert('Vänligen fyll i en giltig e-postadress och välj minst en biljett.');
    return;
  }
  isBookingConfirmed.value = true;
  await updateBooking()
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
  isBookingSuccessful.value = false; // Återställ bokningsstatus
  errorMessage.value = '';           // Återställ felmeddelandet
  email.value = '';
  requestedSeats.value = 1;
};
</script>



<style scoped>
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
