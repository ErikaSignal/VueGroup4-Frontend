export async function getOneMovie(id) {
    try {
        const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
        const data = await response.json();
        const { title, release_date, producer, director, opening_crawl } = data.result.properties;
        return { title, release_date, producer, director, opening_crawl };
    }
    catch (error) {
        throw new Error("Failed to fetch");
      }
  }


  export async function getAllMovies(){
    const apiUrls = [
        'https://www.swapi.tech/api/films/1',
        'https://www.swapi.tech/api/films/2',
        'https://www.swapi.tech/api/films/3'
    ];

    try {
        const responses = await Promise.all(apiUrls.map(url => fetch(url)));
        return await Promise.all(responses.map(res => res.json()));
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
  }


















