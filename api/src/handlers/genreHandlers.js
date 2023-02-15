const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

const genreHandler = async (req, res) => {
    try {
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const nameGenres = genresApi.data.results;
  
      // Usar Promise.all para procesar todas las llamadas a `findOrCreate` en paralelo
      const genreCreationPromises = nameGenres.map(g =>
        Genre.findOrCreate({
          where: {
            name: g.name,
          },
        })
      );
      await Promise.all(genreCreationPromises);
  
      const allGenres = await Genre.findAll();
      res.status(200).json(allGenres);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching genres");
    }
  };

  

module.exports = { genreHandler };
