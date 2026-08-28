import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    // Optional: Google/magic-link users have no password.
    password: { type: String, select: false },
    phoneNumber: { type: String },
    role: { type: String, enum: ["user", "editor", "admin", "super"], default: "user", index: true },
    picture: { type: String },
    active: { type: Boolean, default: true },
    emailVerified: { type: Date, default: null },
    lastLogin: { type: Date },
    // legacy field kept during migration
    last_login: { type: Date, select: false },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
