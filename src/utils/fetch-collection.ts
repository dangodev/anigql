export default function fetchCollection<T>(query: FirebaseFirestore.Query) {
  return query.get().then(snapshot => {
    const docs: FirebaseFirestore.QueryDocumentSnapshot[] = [];
    snapshot.forEach(doc => docs.push(doc));
    return Promise.all(docs.map(doc => doc.data() as T));
  });
}
