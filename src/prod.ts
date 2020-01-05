import { ApolloServer } from 'apollo-server-cloud-functions';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export default { handler: server.createHandler() };
