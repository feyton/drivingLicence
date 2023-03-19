import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import connect from "./config/db";
import { context } from "./context";
import resolvers from "./Resolvers";
import typeDefs from "./Schema/index";

const PORT = process.env.PORT || 5000;
const app = express().use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  cache: "bounded",
  context: context,
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.use(express.static(path.join(path.resolve(), "server/build")));
app.get("*", (req, res) => {
  return res.sendFile(path.join(path.resolve(), "server/build/index.html"));
});

connect.then(() => {
  console.log("Database connected");
  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
});
