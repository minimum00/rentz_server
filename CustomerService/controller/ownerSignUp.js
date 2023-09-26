const {db, auth} = require('../firebaseConfig.js')

const {doc, setDoc} = require('firebase/firestore')
const {createUserWithEmailAndPassword} = require('firebase/auth') 



const ownerSignUp = async(req, res) => {
    const { email, password, name } = req.body;
    const role = 'owner';
    
  try {

    await createUserWithEmailAndPassword(auth, email, password).then(async (Cred) => {

        const userId = Cred.user.uid;
        console.log('user Id is', userId)
        console.log('userCredentials are', Cred)
    
        const userDocRef = doc(db, 'users', `${userId}`)
    
         await setDoc(userDocRef, {
          userID: userId,
          role: role,
          email:email,
           username:name,
           cart:[]
         
        });
        return res.status(201).json({ message: 'User signed up successfully', userId: userId });
    });

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
  module.exports = ownerSignUp
