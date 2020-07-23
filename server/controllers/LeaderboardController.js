const { Leaderboard } = require("../models");
class LeaderboardController {
  static async read(req, res) {
    try {
      const result = await Leaderboard.findAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error Service" });
    }
  }
  static async add(req, res) {
    try {
      const newLeaderboard = {
        name: req.body.name,
        score: Number(req.body.score),
      };
      const result = await Leaderboard.create(newLeaderboard);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error Service" });
    }
  }
}

module.exports = LeaderboardController;
