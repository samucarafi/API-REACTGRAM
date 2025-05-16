import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    //quando usuario é criado ou atualizado será marcado a data:
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
