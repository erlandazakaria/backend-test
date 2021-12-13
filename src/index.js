require('dotenv').config();
import path from "path";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

import { serverPort, dbConnect } from "./config";
import { generateAuth } from "./Utils/auth";
import typeDefs from "./TypeDefs";
import resolvers from "./Resolvers";

import socket from "./socket";

const exp = express();
exp.use(cors({credentials: true, origin: "*"}));
const server = require("http").Server(exp);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

exp.use(express.urlencoded({ extended: true }));
exp.use(express.json({limit: "5Mb"}));
exp.use(express.static(path.join(__dirname, "./Assets")));
exp.get("/", (req, res) => res.send("Glint Test Backend"));

dbConnect();

// let apollo;
const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const auth = generateAuth(req);
      return { auth }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await apollo.start();
  apollo.applyMiddleware({ app: exp });
}

startServer();
socket(io);

server.listen(serverPort, () => {
  console.log("Hello from the otherside");
});
