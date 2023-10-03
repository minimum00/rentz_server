const {db} = require('../firebaseConfig.js')
const {getDoc,setDoc,serverTimestamp,increment,doc,updateDoc,arrayUnion} = require('firebase/firestore')
const crypto = require('crypto')

const axios = require('axios')
const { response } = require('express')
const { timeStamp } = require('console')

const addReview = async(req,res) =>{
    // const {id} = req.query
    const data = req.body
    console.log(data)
    const slicedData = {
        review:data.review,
        userId:data.userID,
        rating:data.rating
    }
    console.log(slicedData)

    const bytes = 16
    const random = crypto.randomBytes(8)
    const reviewID = random.toString('hex') 
    
    const docRef = doc(db,'PropertyReviews',`${data.docID}`)
    
    await getDoc(docRef)
    .then(async (snapShot) =>{
        if(snapShot.exists()){
            let totalRating = snapShot.get('totalRating')
            const ratingCount = snapShot.get('ratingCount')
            totalRating = totalRating + data.rating
            await updateDoc(docRef,{
                timestamp:serverTimestamp(),
                ratingCount:increment(1),
                totalRating:totalRating,
                reviews:arrayUnion(slicedData)
            })
            .then(() =>{
                console.log('Document Updated with new ratings')
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else{
            await setDoc(docRef,{
                totalRating:data.rating,
                timestamp:serverTimestamp(),
                ratingCount:increment(1),
                reviews:arrayUnion(slicedData)
            })
            .then(() =>{
                console.log('Document created with new ratings')
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    })
    .catch((err) =>{
        console.log(err)
    })
    
    res.sendStatus(201)
}

const getReview = async(req,res) =>{
    const {id} = req.query
    const docRef = doc(db,'PropertyReviews',`${id}`)

    try{
        console.log("staring the api")
        const docSnap =await getDoc(docRef)
        const data = docSnap.data()
        const {ratingCount,timestamp,totalRating,reviews} = data
        console.log("Document received")

        const FilteredData = reviews.map(async(item) =>{
            console.log("reviews filer running")
             let DataSet = {
                    review:[],
                    rating:0,
                    username:''
                }
            console.log("making api call to customerService")
            const response = await axios.get(`http://localhost:5002/customer/userDetails?id=${item.userId}`)
            const username = response.data.username
            const review = item.review
            const rating = item.rating
            DataSet.review = review
            DataSet.rating = rating
            DataSet.username = username

            return DataSet

        })

        Promise.all(FilteredData)
        .then((data) =>{
            console.log("sending data")
            res.status(200).json({data,timestamp,totalRating,ratingCount})
        })
        .catch((err) =>{
            console.log(err) 
            res.sendStatus(500) 
        })
        

    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    addReview,
    getReview,
}