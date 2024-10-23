import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081/api';

export const fetchFilmer = async (id) => {
    try {
      const response = await axios.get(`/swapi/${id}`);
      return response.data;
    } catch (error) {
      console.error("Kunde inte hämta filmer:", error);
    }
  };
  

  export const updateBookingFromDb = async (id, requestedSeats) => {
    try {
      if (!id || !requestedSeats) {
        throw new Error('Film ID and requested seats are required');
      }
  
      const updatedBooking = {
        bookedSeats: requestedSeats 
      };
  
      const response = await axios.patch(`/booking/${id}`, updatedBooking);
      return response; 
    } catch (error) {
      console.error('Det gick inte att uppdatera bokningen:', error);
      throw error; // Throwing error for caller to handle
    }
  };