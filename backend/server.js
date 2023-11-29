const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const app = express();

//Routes
app.get("/", (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`Server is started on port ${port}`));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => console.logs(err));
