import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(id: ID): User
    quotes: [Quote]
    quote(by: ID): [Quote]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    by: ID
    name: String
    user: User
  }
`;

const resolvers = {
  Query: {
    greet: () => "Hello Radheshyam",
    users: () => users,
    user: (_, { id }) => users.find((u) => u.id === id),
    quotes: () => quotes,
    quote: (_, { by }) => quotes.filter((q) => q.by === by),
  },
  User: {
    quotes: (u) => quotes.filter((quote) => quote.by === u.id),
  },
  Quote: {
    user: (q) => users.find((u) => u.id === q.by),
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
