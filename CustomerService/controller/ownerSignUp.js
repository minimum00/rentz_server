const {db} = require('../firebaseConfig.js')

const {addDoc, collection} = require('firebase/firestore')
const {createUserWithEmailAndPassword, getAuth} = require('firebase/auth') 
const auth = getAuth();

const ownerSignUp = async(req, res) => {
    const { email, password, name } = req.body;
    const role = 'owner';
    
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    
    const { uid } = userCredential.user;

    
    const userDocRef = await addDoc(collection(db, 'users'), {
      uid,
      email,
      name,
      role,
    });

    return res.status(201).json({ message: 'User signed up successfully', userId: userDocRef.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
  module.exports = ownerSignUp
