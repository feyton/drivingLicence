import { ApolloError } from "apollo-server-express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { authenticated } from "../utils/authenticate";

const SECRET: any = process.env.ACCESS_TOKEN_SECRET;
interface Context {
  role: String;
  userId: String;
}

export default {
  Query: {
    getUsers: async (_: any, args: any, context: Context) => {
      const { userId, role } = context;
      const users = await User.find({});
      return users;
    },
    getProfile: authenticated(async (_: any, args: any, { userId }: any) => {
      const user = await User.findById(userId);
      return user;
    }),
  },
  Mutation: {
    loginUser: async (_: any, args: any, context: any) => {
      const { input } = args;
      const user: any = await User.findOne({ email: input.email });
      if (!user) throw new ApolloError("USER_NOT_FOUND", "404");
      if (user.active === false) throw new ApolloError("USER_INACTIVE", "401");
      const verified = await user.comparePassword(input.password);
      if (!verified) throw new ApolloError("WRONG_CRED", "401");
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "7d" }
      );
      return { token, user };
    },
    createUser: async (_: any, args: any, context: any) => {
      const { input } = args;
      const userExists: any = await User.findOne({
        email: input.email,
      });
      if (userExists) throw new ApolloError("EMAIL_TAKEN", "400");
      const user = await User.create({ ...input });
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "7d" }
      );
      return { token, user };
    },
    deactivateUser: authenticated(async (_: any, args: any, context: any) => {
      const user = await User.findByIdAndUpdate(args.id, { active: false });
      return user;
    }) ,
  },
};
