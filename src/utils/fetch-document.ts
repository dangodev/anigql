import { ApolloError } from 'apollo-server';
import { error } from '../lib/constants';

export default function fetchDocument<T>(
  collection: FirebaseFirestore.CollectionReference,
  id: string
) {
  return collection
    .doc(id)
    .get()
    .then(doc =>
      doc.exists
        ? (doc.data() as T)
        : new ApolloError(`${collection.path} \`${id}\` not found`, error.notFound)
    );
}
