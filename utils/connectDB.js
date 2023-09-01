const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://juneCorp:juneCorp@cluster0.m2zljfq.mongodb.net/juneCorp?retryWrites=true&w=majority"
    );
    console.log("connect DB Successfully");
  } catch (error) {
    console.log("connect DB Failure", error);
  }
};

module.exports = connectDB;
