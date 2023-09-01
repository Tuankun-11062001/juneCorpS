const scheduleM = require("../models/scheduleM");

const scheduleC = {
  getScheduleWeek: async (req, res) => {
    const allSchedule = await scheduleM.find({})
    const reverseArr = allSchedule.reverse();
    const filteredSchedule = reverseArr.filter((item,i) => i <= 7 )
    res.status(200).send(filteredSchedule)
  },
  getScheduleToday: async (req, res) => {
    const date = new Date();
    const today =
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear();
    try {
      const scheduleToday = await scheduleM.findOne({ date: today });
      if(scheduleToday === null){
        return res.status(200).send({message:'no schedule today'});
      }else {
        return res.status(200).send(scheduleToday);
      }
    } catch (error) {
      return res.status(200).send("somthing is error", error);
    }
  },
  createScheduleTomorrow: async (req, res) => {
    const body = req.body;
    const newSchedule = new scheduleM(body);
    try {
      await newSchedule.save();
      return res.status(200).send("Save schedule successfully");
    } catch (error) {
      return res.status(200).send("can't save schedule");
    }
  },

  editSchedule: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      await scheduleM.updateOne({ _id: id }, body);
      return res.status(200).send("update successfully");
    } catch (error) {
      return res.status(200).send(`can't update it ${error}`);
    }
  },
};

module.exports = scheduleC;
