import { IResolvers } from 'apollo-server';
import FilmResolver from './film';
import PersonResolver from './person';

const Resolver: IResolvers = {
  Query: {
    ...FilmResolver.Query,
    ...PersonResolver.Query,
  },
  Mutation:
    process.env.NODE_ENV === 'development'
      ? {
          ...FilmResolver.Mutation,
          ...PersonResolver.Mutation,
        }
      : {},
};

export default Resolver;
