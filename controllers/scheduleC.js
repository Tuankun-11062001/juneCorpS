const scheduleM = require("../models/scheduleM");

const scheduleC = {
  getScheduleWeek: async (req, res) => {
    const allSchedule = await scheduleM.find({})
    const reverseArr = allSchedule.reverse();
    const filteredSchedule = reverseArr.filter((item,i) => i <= 6 );
    const customDataSchedule = {
      data:{
        ...filteredSchedule,
      },
      message:'Get 7 days of schedule'
    }
    res.status(200).send(customDataSchedule)
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
        const customDataRes = {
          data:{
            ...scheduleToday,
          }
          ,
          message:'Get Schedule successfully!'
        }
        return res.status(200).send(customDataRes);
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
      return res.status(200).send("Create schedule successfully");
    } catch (error) {
      return res.status(200).send("can't save schedule");
    }
  },

  editSchedule: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      await scheduleM.updateOne({ _id: id }, body);
      return res.status(200).send("Update Successfully");
    } catch (error) {
      return res.status(200).send(`can't update it ${error}`);
    }
  },
};

module.exports = scheduleC;
