const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

// connect db
const db = require("./utils/connectDB");
db();

// schedule Router
const scheduleR = require("./routers/scheduleR");
app.use("/schedule", scheduleR);

app.listen(PORT, () => console.log("server listening on port", PORT));
