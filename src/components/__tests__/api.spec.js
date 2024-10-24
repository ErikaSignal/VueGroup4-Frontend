
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getOneMovie } from '@/services/api';
import { getAllMovies } from '@/services/api';

describe('getOneMovie', () => {
    const originalFetch = global.fetch;
  
    beforeEach(() => {
      global.fetch = vi.fn();
    });
  
    afterEach(() => {
      global.fetch = originalFetch;
    });
  
    it('should fetch movie details and return them', async () => {
      const mockResponse = {
        result: {
          properties: {
            title: 'A New Hope',
            release_date: '1977-05-25',
            producer: 'Gary Kurtz',
            director: 'George Lucas',
            opening_crawl: 'It is a period of civil war...',
          },
        },
      };

      global.fetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockResponse),
      });
  
      const movie = await getOneMovie(1);
  
      expect(movie).toEqual({
        title: 'A New Hope',
        release_date: '1977-05-25',
        producer: 'Gary Kurtz',
        director: 'George Lucas',
        opening_crawl: 'It is a period of civil war...',
      });

      expect(fetch).toHaveBeenCalledWith('https://www.swapi.tech/api/films/1');
    });
  
    it('should throw an error if the fetch fails', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));
  
      await expect(getOneMovie(1)).rejects.toThrow('Failed to fetch');
    });
  });




describe('getAllMovies', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should fetch all movies and return their details', async () => {
    const mockResponses = [
      { result: { properties: { title: 'A New Hope' } } },
      { result: { properties: { title: 'The Empire Strikes Back' } } },
      { result: { properties: { title: 'Return of the Jedi' } } },
    ];

    global.fetch
      .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(mockResponses[0]) })
      .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(mockResponses[1]) })
      .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(mockResponses[2]) });

    const movies = await getAllMovies();

    expect(movies).toEqual(mockResponses);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith('https://www.swapi.tech/api/films/1');
    expect(fetch).toHaveBeenCalledWith('https://www.swapi.tech/api/films/2');
    expect(fetch).toHaveBeenCalledWith('https://www.swapi.tech/api/films/3');
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(getAllMovies()).rejects.toThrow('Failed to fetch all movies');
  });
});