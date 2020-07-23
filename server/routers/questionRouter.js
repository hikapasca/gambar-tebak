const router = require("express").Router();
const QuestionController = require("../controllers/QuestionController");

router.get("/", QuestionController.read);

module.exports = router;
