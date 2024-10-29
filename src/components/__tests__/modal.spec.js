
import { describe, it, expect, vi} from 'vitest';
import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue';
import infopage1 from '@/views/infopage1.vue';
import { fetchFilmer } from '@/services/database';
import { getOneMovie } from '@/services/api';

vi.mock('@/services/database', () => ({
  fetchFilmer: vi.fn(),
}));

vi.mock('@/services/api', () => ({
  getOneMovie: vi.fn(),
}));

// Mocka useRoute
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 1 }  // Mocka route params
  }),
}));

describe('infopage1', () => {
  it('displays loading message when fetching data', async () => {
    fetchFilmer.mockResolvedValue([]);
    getOneMovie.mockResolvedValue(null);

    const wrapper = mount(infopage1, {
      props: { filmId: 1 }
    });

    expect(wrapper.find('.text-center').text()).toBe('Laddar...');
  });
});

  // Test för att återställa bokningen
  it('resets the booking correctly', async () => {
    const wrapper = mount(Modal, {
      props: {
        filmId: 1,
      },
    });

    // Simulera en lyckad bokning
    await wrapper.vm.updateBooking();

    // Återställ bokningen
    wrapper.vm.resetBooking();

    // Kontrollera att alla värden återställs
    expect(wrapper.vm.isBookingSuccessful).toBe(false);
    expect(wrapper.vm.errorMessage).toBe('');
    expect(wrapper.vm.requestedSeats).toBe(1);
    expect(wrapper.vm.email).toBe('');
  });

  /// increase and decrease seatvalue 

describe('Modal', () => {
    it('increases tickets when increaseTickets is called', async () => {
        document.body.innerHTML = `<div id="exampleModalCenter"></div>`;
        const wrapper = mount(Modal, {
          props: {
            title: 'Sample Movie',
            filmId: 1,
          },
        });
        const ticketInput = wrapper.find('#requestedSeats');

        expect(ticketInput.element.value).toBe('1');
    
        const increaseButton = wrapper.find('button.btn-outline-secondary[type="button"]:last-child');
        await increaseButton.trigger('click');
    
        expect(ticketInput.element.value).toBe('2');
      });
    });
    
    describe('Modal', () => {
        it('decreases tickets when decreaseTickets is called', async () => {
            document.body.innerHTML = `<div id="exampleModalCenter"></div>`;
            const wrapper = mount(Modal, {
              props: {
                title: 'Sample Movie',
                filmId: 1,
              },
            });
            const ticketInput = wrapper.find('#requestedSeats');
    
            expect(ticketInput.element.value).toBe('1');
        
            const increaseButton = wrapper.find('button.btn-outline-secondary[type="button"]:last-child');
            const decreaseButton = wrapper.find('button.btn-outline-secondary[type="button"]:first-child');
            await increaseButton.trigger('click');
        
            expect(ticketInput.element.value).toBe('2');
            await decreaseButton.trigger('click');
            expect(ticketInput.element.value).toBe('1');
          });
        });
        
     

        // email input works and does not work 
