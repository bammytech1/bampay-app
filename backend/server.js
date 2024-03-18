const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const giftCardRoute = require("./routes/giftCardRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  // origin: "https://bamstoreng.netlify.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// API routes
app.use("/api/users", userRoute);
app.use("/api/trades", giftCardRoute);

//Routes
app.get("/", (req, res) => res.send("Server is ready"));

// Serve SPA for unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
