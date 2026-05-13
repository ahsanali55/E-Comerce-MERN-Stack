import mongoose from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // optional because of social login
  provider: "local" | "google" | "facebook";
  avatar?: string;
  googleId?: string;
  facebookId?: string;
  displayName: string;
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
  avatar: String,
  googleId: { type: String, sparse: true },
  facebookId: { type: String, sparse: true },
  displayName: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model<IUser>("User", userSchema);