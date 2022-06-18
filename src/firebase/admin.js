const admin = require("firebase-admin")

const serviceAccount = require(process.env)

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (error) {}

export const firestore = admin.firestore()
