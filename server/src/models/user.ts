import bcrypt from "bcrypt";
import mongoose, { model, Schema } from "mongoose";
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/feyton/image/upload/v1643272521/user_nophzu.png",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});
userSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

export const User = model("User", userSchema);
