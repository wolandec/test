const express = require("express");
const { ApolloServer } = require("apollo-server-express");
import LocaleService from "./services/LocaleService";
import typeDefs from "./graphqlSchema"

const localeService = new LocaleService();

const resolvers = {
  Query: {
    async locale(parent: any, args: any) {
      return JSON.stringify(await localeService.getLocale(args.locale)) || "";
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
