import { mergeResolvers } from "@graphql-tools/merge";
import { GraphQLScalarType, Kind } from "graphql";
import QuizResolver from "./quizResolver";
import userResolver from "./userResolver";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    console.log("Ser", value);
    return value.getTime();
  },
  parseValue(value: any) {
    console.log("par", value);
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    console.log(ast);

    return ast;
  },
});

const resolvers = mergeResolvers([
  QuizResolver,
  userResolver,
  { Date: DateScalar },
  {
    DateTime: new GraphQLScalarType({
      name: "DateTime",
      description: "A date and time, represented as an ISO-8601 string",
      serialize(value:any) {
        return new Date(value).toISOString();
      },
      parseValue(value:any) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${value}`);
        }
        return date;
      },
      parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
          throw new Error(`Invalid type for DateTime: ${ast.kind}`);
        }
        const date = new Date(ast.value);
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${ast.value}`);
        }
        return date;
      },
    }),
  },
]);

export default resolvers;
