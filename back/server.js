const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.DB_PORT;
const user_info = require("./routes/user_info");
const bodyParser = require("body-parser");

app.use(express.json());

const cors = require("cors");

app.use(cors());
app.use("/login", user_info);

app.listen(PORT, () => {
  console.log("server is running on 5000");
});
