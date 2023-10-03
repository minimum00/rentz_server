const {db,storage} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc,collection,query,where} = require('firebase/firestore')

const   {
        createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut
        } 
        = require('firebase/auth') 

const auth = getAuth()
const admin = require('firebase-admin')




const postsignup = async(req,res) =>{

    const {username,email,password} = req.body

    try{

        await createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCred) => {
            const userID = userCred.user.uid
            const userRef = doc(db,'users',`${userID}`)
            await setDoc(userRef,{
                email:email,
                username:username,
                cart:[]
            })
            res.sendStatus(201)
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
        const userID = userCred.user.uid
        const userRef = doc(db,'users',`${userID}`)
        const docSnap = await getDoc(userRef)
        const userData = docSnap.data()

        auth.currentUser.getIdToken()
        .then((token) =>{
            res.cookie('jwt',token)
            res.status(200).json({token:token,userData:userData.username})
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
            res.clearCookie('jwt');
           
            await signOut(auth);
      
            return res.status(200).json({ message: 'User logged out successfully' });
          
      
       
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

const getUserDetail = async(req,res) =>{
    const {id} = req.query
    const userRef = doc(db,'users',`${id}`)
   try{
        await getDoc(userRef)
        .then((userInfo) =>{
            console.log(userInfo.data())
            const username = userInfo.data().username
            res.status(200).json({username:username})
        })
        .catch(err => console.log(err))
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    postlogin,
    postsignup,
    UserLogOut,
    getUserDetail
}