import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1)
      console.log("Connection mongoDB is successfully !");
    else console.log("Connection MongoDb failed !");
  } catch (error) {
    console.log("DB connection is failed !");
    throw new Error(error);
  }
};

export default dbConnect;
