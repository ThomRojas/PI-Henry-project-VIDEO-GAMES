const { Router } = require('express');
const videoGamesRouter = require("./videoGamesRouter")
const genreRouter = require("./genreRouter");



const router = Router();

router.use("/videogames", videoGamesRouter);
router.use("/genres", genreRouter)



module.exports = router;
