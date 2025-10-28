import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo:{
      type:String,
      default:""
    },
    TwoFactorAuth: {
      type: String,
      default: "false",
    },
    type: {
      type: String,
      enum: ["normalUser", "googleUser"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;