const router = require("express").Router();
const LeaderboardController = require("../controllers/LeaderboardController");

router.get("/", LeaderboardController.read);

router.post("/", LeaderboardController.add);

module.exports = router;
