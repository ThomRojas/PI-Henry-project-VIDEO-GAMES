const axios = require("axios");
const { Videogame, Genre } = require("../db");
const {API_KEY} = process.env;

const apiGames = async () => {
  const api = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1`
  );
  const api2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const api3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const api4 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const api5 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );

  const AllApiGames = api.data.results.concat(
    api2.data.results,
    api3.data.results,
    api4.data.results,
    api5.data.results
  );

  let apiInfo = AllApiGames.map((game) => {
    const platforms = game.platforms.map((platform) => platform.platform.name);
    const genres = game.genres.map((genre) => "" + genre.name);
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platform: platforms,
      genres: genres.toString(),
    };
  });
  return apiInfo;
};

const getDBGames = async () => {
  let db = await Videogame.findAll({ include: [Genre] });
  db = db.map((game) => {
    const genres = game.genres.map((genre) => genre.name);
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      released: game.released,
      rating: game.rating,
      platform: game.platform,
      genres: genres.toString(),
      createdByDB: true,
    };
  });
  return db;
};

const allGamesGenerator = async () => {
  let gamesFromApi = await apiGames();
  let gamesFromDB = await getDBGames();
  const allGames = [...gamesFromApi, ...gamesFromDB];
  return allGames;
};

const getVideoGamesHandler = async (req, res) => {
  try {
    let allInfo = await allGamesGenerator();
    const { name } = req.query;
    if (name) {
      const byName = allInfo.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      byName.length
        ? res.status(200).json(byName.splice(0, 14))
        : res.status(404).json({ msg: "Game not Found 😕" });
    } else {
      res.status(200).json(allInfo);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing the information." });
  }
};

const getVideoGameByIdHandler = async (req, res) => {
  const { id } = req.params;
  if (id) {
    if (id.includes("-")) {
      let gameFromDbb = await Videogame.findOne({
        where: { id },
        includes: [Genre],
      });
      res.status(200).json(gameFromDbb);
    } else {
      try {
        const gameFromApi = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const gameInfo = gameFromApi.data;
        const platforms = gameInfo.platforms.map(
          (platforms) => platforms.platform.name
        );
        const genres = gameInfo.genres.map((genre) => genre.name);
        const details = {
          id: gameInfo.id,
          name: gameInfo.name,
          image: gameInfo.background_image,
          released: gameInfo.released,
          rating: gameInfo.rating,
          platform: platforms,
          genres: genres.toString(),
          description: gameInfo.description_raw,
        };
        res.status(200).json(details);
      } catch (error) {
        res.status(404).send({
          error: `No videoGame found with that id: ${id}`,
        });
      }
    }
  } else {
    throw Error;
  }
};

const createVideoGameHandler = async (req, res) => {
  try {
    const { name, image, description, released, rating, genres, platform } =
      req.body;
    let newGame = await Videogame.create({
      name,
      image,
      description,
      released,
      rating: rating || 1,
      platform,
    });
    console.log(`Created videogame:`, newGame.toJSON());
    let genreDbb = await Genre.findAll({
      where: { name: genres },
    });
    console.log(
      `Found genres:`,
      genreDbb.map((g) => g.toJSON())
    );
    if (genreDbb.length > 0) {
      newGame.addGenre(genreDbb);
      console.log(`Added genres to videogame`);
    } else {
      console.error(`No genres found`);
    }
    res.status(201).send("VideoGame created suscessfully! 👌");
  } catch (error) {
    console.error(`Error while creating videogame:`, error);
    res.status(400).json({ error: error.message });
  }
};

const deleteVideoGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Videogame.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      res.status(404).json("Video game not found");
      return;
    }
    res.status(204).json("VideoGame was deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error deleting video game");
  }
};

const updateVideoGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, released, rating } = req.body;
    const videoGame = await Videogame.findByPk(id);
    if (!videoGame) {
      res.status(404).json({ msg: "Game not Found 😕" });
      return;
    }
    await videoGame.update(
      {
        name,
        image,
        description,
        released,
        rating,
      },
      {
        where: { id },
      }
    );
    res.status(200).json(videoGame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating video game");
  }
};

module.exports = {
  getVideoGamesHandler,
  getVideoGameByIdHandler,
  createVideoGameHandler,
  deleteVideoGameById,
  updateVideoGameById,
};
