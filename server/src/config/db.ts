import "dotenv/config";
import mongoose from "mongoose";

const uri: string = process.env.DATABASE_URL || "";

const connect = mongoose.connect(uri, {});

export default connect;