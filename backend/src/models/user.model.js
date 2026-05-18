import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

// Add unique index to email
userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;