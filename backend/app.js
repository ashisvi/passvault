const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes");
const getIP = require("./utils/getIP");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const ip = getIP();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running on port http://127.0.0.1:${port}` +
      (ip ? ` or http://${ip}:${port}` : ""),
  );
});
