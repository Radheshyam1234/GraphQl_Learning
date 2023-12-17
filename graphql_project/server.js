import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    quotes: [Quote]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Quote {
    by: ID
    name: String
  }
`;

const resolvers = {
  Query: {
    greet: () => "Hello Radheshyam",
    users: () => users,
    quotes: () => quotes,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
