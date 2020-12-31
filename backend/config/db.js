import moongose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`DB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    //Exit with failure.
    process.exit(1);
  }
};

export default connectDB;
