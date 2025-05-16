import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = encodeURIComponent(process.env.DB_PASS);

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.0m4pyrn.mongodb.net/?retryWrites=true&w=majority&appName=ReactGram`
    );
    console.log("Conectou ao Banco");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};
conn();

export default conn;
