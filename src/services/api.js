export async function getOneMovie(id) {
    try {
        const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
        const data = await response.json();
        // console.log("data:", data.result.properties); 
        const { title, release_date, producer, director, opening_crawl } = data.result.properties;
        return { title, release_date, producer, director, opening_crawl };
    }
    catch (error) {
        throw new Error("Failed to fetch");
      }
  }



















