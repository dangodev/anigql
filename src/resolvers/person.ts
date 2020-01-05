import { IResolverObject } from 'apollo-server';
import db from '../lib/db';
import { collection } from '../lib/constants';
import fetchCollection from '../utils/fetch-collection';
import fetchDocument from '../utils/fetch-document';
import parseOrderBy from '../utils/parse-order-by';
import { Film, Person, QueryFilmArgs, QueryPeopleArgs } from '../types/api';

const PersonResolver: IResolverObject = {
  Query: {
    person(_, args: QueryFilmArgs) {
      return fetchDocument<Person>(db.collection(collection.people), args.id);
    },
    people(_, args: QueryPeopleArgs) {
      let query: FirebaseFirestore.Query = db.collection(collection.people);

      // order
      if (Array.isArray(args.orderBy) && args.orderBy.length > 0) {
        args.orderBy.forEach(token => {
          const { field, direction } = parseOrderBy(token);
          query = query.orderBy(field, direction);
        });
      }

      // limit
      if (args.limit) {
        query = query.limit(args.limit);
      }

      return fetchCollection<Film>(query);
    },
  },
  Mutation: {},
};

export default PersonResolver;
