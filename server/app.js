const express = require("express");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routers");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`NOW RUNNING ON PORT ${PORT}`);
});
