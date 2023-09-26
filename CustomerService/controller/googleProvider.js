const {auth} = require('../firebaseConfig')
const { OAuthProvider, signInWithPopup } = require('firebase/auth');

const googleProvider = new OAuthProvider('google.com')
const GoogleSignUp = async (req, res) => {
    try {
        const result = await signInWithPopup (auth, googleProvider);
        const user = result.user;

        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        }

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, userData);

        res.status(200).json(userData);
    } catch (error) {
        console.error('error signing up with Google', error);
        res.status(500).json({ error: 'Something Went Wrong. '});
    }

    
}

module.exports = GoogleSignUp;