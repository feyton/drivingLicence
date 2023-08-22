import { ApolloError } from "apollo-server-express";
import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { authenticated } from "../utils/authenticate";

const SECRET: any = process.env.ACCESS_TOKEN_SECRET;
const client = new OAuth2Client(process.env.CLIENT_ID);
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
      const { email, password, token: AccessToken } = input;
      if (!email && !AccessToken) throw new ApolloError("WRONG_CRED", "400");
      if (AccessToken) {
        try {
          const ticket = await client.verifyIdToken({
            idToken: AccessToken,
            audience: process.env.CLIENT_ID,
          });
          if (!ticket) throw new Error("The token is invalid");
          const { name, email, picture }: any = ticket.getPayload();
          // @ts-ignore
          const res = await User.findOneAndUpdate(
            {
              email: email,
            },
            {
              name: name,
              picture: picture,
              last_login: new Date(),
            },
            {
              upsert: true,
              new: true,
              rawResult: true,
            }
          );
          const user = res.value;
          if (user?.active === false)
            throw new ApolloError("Account not active", "INACTIVE");

          const accessToken = jwt.sign(
            {
              userId: user?.id,
              role: user?.role,
            },
            // @ts-ignore
            SECRET,
            { expiresIn: "7d" }
          );

          return {
            token: accessToken,
            user: user?.toJSON(),
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
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
    }),
  },
};
