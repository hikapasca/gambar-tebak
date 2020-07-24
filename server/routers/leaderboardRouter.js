const router = require("express").Router();
const LeaderboardController = require("../controllers/LeaderboardController");

router.get("/", LeaderboardController.read);

router.post("/", LeaderboardController.add);

router.put("/", LeaderboardController.update);

router.delete("/", LeaderboardController.delete);

module.exports = router;
