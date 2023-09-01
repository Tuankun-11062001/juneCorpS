const scheduleR = require("express").Router();
const scheduleC = require("../controllers/scheduleC");

scheduleR.get("/", scheduleC.getScheduleToday);
scheduleR.get("/week", scheduleC.getScheduleWeek);
scheduleR.post("/create", scheduleC.createScheduleTomorrow);
scheduleR.put("/:id", scheduleC.editSchedule);

module.exports = scheduleR;
