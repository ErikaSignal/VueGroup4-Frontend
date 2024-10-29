import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';
import axios from 'axios';

vi.mock('axios');

describe('Modal', () => {
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = `<div id="exampleModalCenter"></div>`;
    wrapper = mount(Modal, {
      props: {
        movieId: 120,
        title: 'Sample Movie',
        filmId: 1,
      },
    });
    axios.patch.mockResolvedValue({ data: { success: true } });
  });

  it('increases tickets when increaseTickets is called', async () => {
    const ticketInput = wrapper.find('#requestedSeats');
    const increaseButton = wrapper.find('button.btn-outline-secondary[type="button"]:last-child');
    
    expect(ticketInput.element.value).toBe('1');
    await increaseButton.trigger('click');
    expect(ticketInput.element.value).toBe('2');
  });

  it('decreases tickets when decreaseTickets is called, but not below 1', async () => {
    const ticketInput = wrapper.find('#requestedSeats');
    const decreaseButton = wrapper.find('button.btn-outline-secondary[type="button"]:first-child');
    
    expect(ticketInput.element.value).toBe('1');
    await decreaseButton.trigger('click');
    expect(ticketInput.element.value).toBe('1');
  });

  it('confirms booking when saveChanges is called with valid email', async () => {
    wrapper.find('#email').setValue('test@example.com');
    await wrapper.vm.saveChanges();
    expect(wrapper.vm.isBookingConfirmed).toBe(true);
  });

  it('does not confirm booking if email is missing', async () => {
    wrapper.find('#email').setValue('');
    await wrapper.vm.saveChanges();
    expect(wrapper.vm.isBookingConfirmed).toBe(false);
  });
});