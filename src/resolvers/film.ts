import { IResolverObject, ApolloError } from 'apollo-server';
import db from '../lib/db';
import { collection, error } from '../lib/constants';
import fetchCollection from '../utils/fetch-collection';
import fetchDocument from '../utils/fetch-document';
import limitDepth from '../utils/limit-depth';
import parseOrderBy from '../utils/parse-order-by';
import {
  Film,
  MutationAddDirectorToFilmArgs,
  MutationAddStudioToFilmArgs,
  Person,
  QueryFilmArgs,
  QueryFilmsArgs,
  Studio,
} from '../types/api';

const depth = { films: 2, directors: 2, studio: 1 };

const FilmResolver: IResolverObject = {
  Query: {
    film(_, args: QueryFilmArgs) {
      return fetchDocument<Film>(db.collection(collection.films), args.id);
    },
    films(_, args: QueryFilmsArgs) {
      let query: FirebaseFirestore.Query = db.collection(collection.films);

      // order
      if (Array.isArray(args.orderBy) && args.orderBy.length > 0) {
        args.orderBy.forEach(token => {
          const { field, direction } = parseOrderBy(token);
          query = query.orderBy(field, direction);
        });
      }

      // filter
      if (args.yearStart) {
        query = query.where('yearStart', '>=', args.yearStart);
      }
      if (args.yearEnd) {
        query = query.where('yearEnd', '>=', args.yearEnd);
      }

      // limit
      if (args.limit) {
        query = query.limit(args.limit);
      }

      // return
      return fetchCollection(query);
    },
  },
  Mutation: {
    async addDirectorToFilm(_, args: MutationAddDirectorToFilmArgs) {
      const people = await fetchCollection<Person>(db.collection(collection.people));
      const peopleMap: { [key: string]: Person } = people.reduce(
        (state, next) => ({ ...state, [next.ID]: next }),
        {}
      );
      const person = peopleMap[args.person];

      const films = await fetchCollection<Film>(db.collection(collection.films));
      const filmMap: { [key: string]: Film } = films.reduce(
        (state, next) => ({ ...state, [next.ID]: next }),
        {}
      );
      const film = filmMap[args.film];

      if (!film || !person) {
        throw new ApolloError(
          `Record \`${args.film}\` or \`${args.person}\` not found`,
          error.notFound
        );
      }

      // update films
      if (Array.isArray(film.directors)) {
        if (film.directors.findIndex(({ ID }) => ID === args.person) === -1) {
          film.directors.push(person);
        }
        film.directors.filter(({ ID }) => !!peopleMap[ID]);
        film.directors.map(({ ID }) => peopleMap[ID]);
      } else {
        film.directors = [person];
      }

      // update person
      if (Array.isArray(person.films)) {
        if (person.films.findIndex(({ ID }) => ID === args.film) === -1) {
          person.films.push(film);
        }
        person.films.filter(({ ID }) => !!filmMap[ID]);
        person.films.map(({ ID }) => filmMap[ID]);
        person.films.sort((a, b) => a.releaseYear - b.releaseYear); // sort films by year
      } else {
        person.films = [film];
      }

      const newPerson = limitDepth(person, depth);
      const newFilm = limitDepth(film, depth);

      db.collection(collection.people)
        .doc(args.person)
        .set({ films: newPerson.films }, { merge: true });

      db.collection(collection.films)
        .doc(args.film)
        .set({ directors: newFilm.directors }, { merge: true });

      return newFilm;
    },
    async addStudioToFilm(_, args: MutationAddStudioToFilmArgs) {
      const studio = await fetchDocument<Studio>(db.collection(collection.studios), args.studio);
      const film = await fetchDocument<Film>(db.collection(collection.films), args.film);

      // update film
      if (!film.studio) {
        film.studio = studio;
      }

      // update person
      if (Array.isArray(studio.films)) {
        const i = studio.films.findIndex(({ ID }) => ID === args.film);
        if (i === -1) {
          studio.films.push(film);
        } else {
          studio.films[i] = film;
        }
        studio.films.sort((a, b) => a.releaseYear - b.releaseYear); // sort films by year
      } else {
        studio.films = [film];
      }

      const newStudio = limitDepth(studio, depth);
      const newFilm = limitDepth(film, depth);

      db.collection(collection.films)
        .doc(args.film)
        .set({ studio: newStudio }, { merge: true });

      newStudio.films.forEach(doc => {
        db.collection(collection.films)
          .doc(doc.ID)
          .set({ films: newStudio.films }, { merge: true });
      });

      return newFilm;
    },
  },
};

export default FilmResolver;
