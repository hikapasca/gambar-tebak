const { Leaderboard } = require("../models");
class LeaderboardController {
  static async read(req, res) {
    try {
      const result = await Leaderboard.findAll();
      let filteringData = [];
      for (let i = 0; i < result.length; i++) {
        filteringData.push(result[i]);
      }
      let flag = false;
      while (flag === false) {
        flag = true;
        for (let i = 0; i < filteringData.length - 1; i++) {
          if (filteringData[i].score > filteringData[i + 1].score) {
            flag = false;
            let swap = filteringData[i + 1];
            filteringData[i + 1] = filteringData[i];
            filteringData[i] = swap;
          }
        }
      }
      const filterData = filteringData.reverse().slice(0, 5);
      return res.status(200).json(filterData);
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
