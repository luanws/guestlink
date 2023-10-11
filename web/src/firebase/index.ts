import firebaseAdmin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS ?? '{}')
const databaseURL = process.env.FIREBASE_DATABASE_URL

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL
  })
}

export const firebase = firebaseAdmin