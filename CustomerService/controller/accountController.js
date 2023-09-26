const {db, auth} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc,collection,query,where} = require('firebase/firestore')
const {createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} = require('firebase/auth') 

// const userRef = collection(db,'users')
const user = {}
const postsignup = async(req,res) =>{

    const {username,email,password} = req.body
   
   

    try{

        await createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCred) => {
            user = userCred
            const userID = userCred.user.uid
            const userRef = doc(db,'users',`${userID}`)
            await setDoc(userRef,{
                email:email,
                username:username,
                cart:[]
            })
            res.Status(201).json
        })
        .catch((err) =>{
            console.log(err)
            res.sendStatus(401)
        })
    }
    catch(err){
        console.log(err)
    }
}

const postlogin = async(req,res)=>{
    const {email,password} = req.body
    const auth = getAuth()
    console.log(req.body)
   try{
     await signInWithEmailAndPassword(auth,email,password)
     .then(async (userCred) =>{
        console.log('user logged in')
        const user = userCred;
        const userID = userCred.user.uid
        const userRef = doc(db,'users',`${userID}`)
        const docSnap = await getDoc(userRef)
        const userData = docSnap.data()

        auth.currentUser.getIdToken()
        .then((token) =>{
            res.cookie('jwt',token)
            res.status(200).json({token:token, userData:userData.username, user:user })
            console.log(token)
        })
     })
   }
   catch(err){
    console.log(err)
    res.sendStatus(401)
   }

}
const UserLogOut = async(req, res) => {
    try{
    
            const user = req.body
            console.log('userObject is ', user)
            res.clearCookie('jwt');
           
            await signOut(auth);
      
            return res.status(200).json({ message: 'User logged out successfully' });
          
      
       
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

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

const ResetPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
    
  
      await sendPasswordResetEmail(auth, email);
  
      return res.status(200).json({ message: 'Password reset email sent successfully' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
  
    }
  };
  

module.exports = {
    postlogin,
    postsignup,
    UserLogOut,
    ownerSignUp,
    ResetPassword,
    user
}