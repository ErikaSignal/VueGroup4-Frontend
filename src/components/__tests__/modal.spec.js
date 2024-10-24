
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { mount } from '@vue/test-utils'
import { describe, it, expect, render, fireEvent } from 'vitest';
import Modal from '@/components/Modal.vue'; 
import { updateBookingFromDb } from '@/services/database';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { describe, it, expect } from 'vitest';

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