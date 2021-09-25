import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
require("dotenv").config();

const startServer = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log("db error:", err));

  const server = new ApolloServer({
    cors: {
      origin: [
        process.env.CORS_ORIGIN as string,
        "https://studio.apollographql.com",
      ],
      credentials: true,
    },
    typeDefs,
    resolvers,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

  server.listen({ port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer().catch((err) => console.error(err));
