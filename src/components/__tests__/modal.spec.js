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

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 1 } 
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

  it('resets the booking correctly', async () => {
    const wrapper = mount(Modal, {
      props: {
        filmId: 1,
      },
    });

    await wrapper.vm.updateBooking();

    wrapper.vm.resetBooking();

    expect(wrapper.vm.isBookingSuccessful).toBe(false);
    expect(wrapper.vm.errorMessage).toBe('');
    expect(wrapper.vm.requestedSeats).toBe(1);
    expect(wrapper.vm.email).toBe('');
  });

