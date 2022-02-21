require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const mainRouter = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
