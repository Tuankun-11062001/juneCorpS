const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleModel = Schema(
  {
    date: String,
    morning: [
      {
        date: String,
        time: String,
        code: String,
        subject: String,
        content: String,
        state: String,
        session: String,
      },
    ],
    afternoon: [
      {
        date: String,
        time: String,
        code: String,
        subject: String,
        content: String,
        state: String,
        session: String,
      },
    ],
    evenning: [
      {
        date: String,
        time: String,
        code: String,
        subject: String,
        content: String,
        state: String,
        session: String,
      },
    ],
  },
  { timestamps: true }
);

const ScheduleM = mongoose.model("schedule", scheduleModel);

module.exports = ScheduleM;
