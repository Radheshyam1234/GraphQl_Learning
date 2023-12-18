import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(id: ID): User
    quotes: [Quote]
    iquotes(by: ID): [Quote]
    quotesById(id: ID): Quote
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
    iquotes: (_, { by }) => quotes.filter((q) => q.by === by),
    quotesById: (_, { id }) => quotes.find((q) => q.id === id),
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
