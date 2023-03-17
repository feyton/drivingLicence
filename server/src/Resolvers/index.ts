import { mergeResolvers } from "@graphql-tools/merge";
import { GraphQLScalarType, Kind } from "graphql";
import QuizResolver from "./quizResolver";
import userResolver from "./userResolver";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value.getTime();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});

const resolvers = mergeResolvers([QuizResolver, userResolver, {Date: DateScalar}]);

export default resolvers;
