const { Leaderboard } = require("../models");
class LeaderboardController {
  static async read(req, res) {
    try {
      const result = await Leaderboard.findAll({order: [['score', 'DESC']]});
      // let filteringData = [];
      // for (let i = 0; i < result.length; i++) {
      //   filteringData.push(result[i]);
      // }
      // let flag = false;
      // while (flag === false) {
      //   flag = true;
      //   for (let i = 0; i < filteringData.length - 1; i++) {
      //     if (filteringData[i].score > filteringData[i + 1].score) {
      //       flag = false;
      //       let swap = filteringData[i + 1];
      //       filteringData[i + 1] = filteringData[i];
      //       filteringData[i] = swap;
      //     }
      //   }
      // }
      // const filterData = filteringData.reverse().slice(0, 5);
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

  static async delete(req, res) {
    try {
      const result = Leaderboard.destroy({where:{}});

      return res.status(200).json({ message: "delete" });
    } catch (err) {
      res.status(500).json({ message: "Internal Error Service" });
    }
  }

  static async update(req, res) {
    try {
      const name = req.body.name;
      const score = Number(req.body.score);
      const updateLeaderboard = {
        name,
        score,
      };
      const result = await Leaderboard.update(updateLeaderboard, {
        where: { name: name },
        returning: true,
      });
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Internal Error Service" });
    }
  }
}

module.exports = LeaderboardController;
