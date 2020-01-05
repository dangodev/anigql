import admin from 'firebase-admin';
import functions from 'firebase-functions';

/* eslint-disable @typescript-eslint/no-var-requires,global-require */

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp(functions.config().firebase);
} else {
  const serviceKey = require('../../service-key.json');
  admin.initializeApp({ credential: admin.credential.cert(serviceKey) });
}

export default admin.firestore();
