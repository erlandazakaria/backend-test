require('dotenv').config();
import mongoose from "mongoose";

const serverPort = 7000;
const dbServer =  process.env.MODE === "production" ? process.env.PROD_DATABASE : process.env.DEV_DATABASE;

const dbConnect = async () => {
  try {
    await mongoose.connect(dbServer, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    });
    console.log("Database Connected")
  } catch(err) {
    console.log("Database Connection Error", err)
  }
};

export {
  serverPort,
  dbConnect
};
