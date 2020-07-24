const { Question } = require("../models");
class QuestionController {
  static async read(req, res) {
    try {
      const result = await Question.findAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error Service" });
    }
  }
  static async readById(req, res) {
    try {
      const getId = req.params.id;
      const result = await Question.findOne({ where: { id: getId } });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error Service" });
    }
  }
}

module.exports = QuestionController;
