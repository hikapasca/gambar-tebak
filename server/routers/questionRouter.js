const router = require("express").Router();
const QuestionController = require("../controllers/QuestionController");

router.get("/", QuestionController.read);
router.get("/:id", QuestionController.readById);

module.exports = router;
