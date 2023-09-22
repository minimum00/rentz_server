const {db} = require('../firebaseConfig.js')
const {getDoc,setDoc,collection,doc,updateDoc} = require('firebase/firestore')
const crypto = require('crypto')

const addReview = async(req,res) =>{
    const {id} = req.query
    const data = req.body

    const bytes = 16
    const random = crypto.randomBytes(8)
    const reviewID = random.toString('hex') 
    console.log(reviewID)
    
    await setDoc(doc(db,'PropertyReviews',`${id}`),{[reviewID]:{...data}},{merge:true})
    console.log(data)

    res.sendStatus(201)
}

const getReview = async(req,res) =>{
    const {id} = req.query
    const docRef = doc(db,'PropertyReviews',`${id}`)
    const docSnap =await getDoc(docRef)
    console.log(docSnap.data())
    res.status(200).send(docSnap.data())
}

module.exports = {
    addReview,
    getReview,
}