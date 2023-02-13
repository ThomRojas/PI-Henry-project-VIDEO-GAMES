const {Router} = require("express")

const router = Router();

const {genreHandler} = require("../handlers/genreHandlers")

router.get("/",genreHandler)


module.exports = router;