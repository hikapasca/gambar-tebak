const router = require("express").Router();
const leaderboardRouter = require("./leaderboardRouter");
const questionRouter = require("./questionRouter");

router.use("/leaderboards", leaderboardRouter);
router.use("/questions", questionRouter);

module.exports = router;
