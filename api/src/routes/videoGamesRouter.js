const {Router} = require("express")

const router = Router();

const {
    getVideoGamesHandler,
    getVideoGameByIdHandler,
    createVideoGameHandler,
    deleteVideoGameById,
    updateVideoGameById
} = require("../handlers/videoGamesHandlers")


router.get("/", getVideoGamesHandler);

router.get("/:id", getVideoGameByIdHandler);

router.post("/", createVideoGameHandler);

router.put("/:id", updateVideoGameById);

router.delete("/:id", deleteVideoGameById);

module.exports = router;