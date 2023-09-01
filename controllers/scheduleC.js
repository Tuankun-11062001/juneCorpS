const scheduleM = require("../models/scheduleM");

const scheduleC = {
  getScheduleWeek: async (req, res) => {
    const allSchedule = await scheduleM.find({})
    const reverseArr = allSchedule.reverse();
    const filteredSchedule = reverseArr.filter((item,i) => i <= 6 );
    const customDataSchedule = {
      data:[...filteredSchedule],
      message:'Get 7 days of schedule'
    }
    res.status(200).send(customDataSchedule)
  },
  getScheduleToday: async (req, res) => {
    const date = new Date();
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const today =
      ("0" + (nextDate.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + nextDate.getDate()).slice(-2) +
      "/" +
      nextDate.getFullYear();
      
    try {
      const scheduleToday = await scheduleM.findOne({ date: today });
      console.log(scheduleToday)
      if(scheduleToday === null){
        return res.status(200).send({message:'no schedule today',data:{}});
      }else {
        const customDataRes = {
          data:scheduleToday,
          message:'Get Schedule successfully!',
        }
        return res.status(200).send(customDataRes);
      }
    } catch (error) {
      return res.status(404).send({message:"Can't get schedule today"});
    }
  },
  createScheduleTomorrow: async (req, res) => {
    const body = req.body;
    const newSchedule = new scheduleM(body);
    try {
      await newSchedule.save();
      return res.status(200).send({message:"Create schedule successfully"});
    } catch (error) {
      return res.status(404).send({message:"can't save schedule"});
    }
  },

  editSchedule: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      await scheduleM.updateOne({ _id: id }, body);
      return res.status(200).send({message:"Update Successfully"});
    } catch (error) {
      return res.status(404).send({message:"Can't update schedule"});
    }
  },
};

module.exports = scheduleC;
