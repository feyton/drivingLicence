import { ApolloError } from "apollo-server";

export const authenticated =
  (next: (arg0: any, arg1: any, arg2: any, arg3: any) => any) =>
  (root: any, args: any, context: { userId: any }, info: any) => {
    console.log(context);
    if (!context.userId) {
      throw new ApolloError("Login is required", "UNAUTHENTICATED");
    }

    return next(root, args, context, info);
  };

export const validateRole =
  (role: string[]) =>
  (next: (arg0: any, arg1: any, arg2: any, arg3: any) => any) =>
  (root: any, args: any, context: { role: string }, info: any) => {
    if (!role.includes(context.role)) {
      throw new ApolloError("Permission Denied", "PERMISSION_DENIED");
    }

    return next(root, args, context, info);
  };
