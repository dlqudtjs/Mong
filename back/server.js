const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.DB_PORT;
const user_info = require("./routes/index");
const bodyParser = require("body-parser");

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/", user_info); //route경로 미들웨어 등록

app.listen(PORT, () => {
  console.log("server is running on 5000");
});
