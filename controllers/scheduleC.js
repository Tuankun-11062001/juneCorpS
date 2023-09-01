const scheduleM = require("../models/scheduleM");

const scheduleC = {
  getScheduleWeek: async (req, res) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];
    console.log('date',d.getDate(),d.getMonth() + 1)
    console.log('today ',day)
    
    // var curr = new Date(); // get current date
    // var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    // var last = first + 6; // last day is the first day + 6

    // var firstday = new Date(curr.setDate(first));
    // var lastday = new Date(curr.setDate(last));
    // const formatFirstDay =
    //   ("0" + (firstday.getMonth() + 1)).slice(-2) +
    //   "/" +
    //   ("0" + firstday.getDate()).slice(-2) +
    //   "/" +
    //   firstday.getFullYear();

    // const formatLastDay =
    //   ("0" + (lastday.getMonth() + 1)).slice(-2) +
    //   "/" +
    //   ("0" + lastday.getDate()).slice(-2) +
    //   "/" +
    //   lastday.getFullYear();
    // console.log('cur',curr);
    // console.log('first',firstday);
    // console.log('last',lastday);
    // const data = await scheduleM.find();
    // const findArrayWeek = data.filter(
    //   (item) => item.date >= formatFirstDay && item.date <= formatLastDay
    // );

    // res.status(200).send(findArrayWeek);
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
