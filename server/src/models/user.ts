import mongoose from "mongoose";
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
