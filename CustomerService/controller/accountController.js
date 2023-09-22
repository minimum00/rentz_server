const {db} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc,collection,query,where} = require('firebase/firestore')
const {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} = require('firebase/auth') 

// const userRef = collection(db,'users')

const postsignup = async(req,res) =>{

    const {username,email,password} = req.body
    const auth = getAuth()

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

module.exports = {
    postlogin,
    postsignup
}