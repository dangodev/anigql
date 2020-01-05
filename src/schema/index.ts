import * as path from 'path';
import * as fs from 'fs';

const typeDefs = [
  './film.graphql',
  './frame-sequence.graphql',
  './image.graphql',
  './person.graphql',
  './release.graphql',
  './root.graphql',
  './studio.graphql',
].map(schema => fs.readFileSync(path.resolve(__dirname, schema), 'utf8'));

export default typeDefs.join('\n');
