const {db} = require('../firebaseConfig.js')
const {getDocs,addDoc,collection,doc,getDoc,query,where} = require('firebase/firestore')


const collRefRooms = collection(db,'Rooms')

const catalogue = async (req,res) =>{
    let data = []

    const {location} = req.query
    console.log(location)

    if(location !== 'null'){
        const q = query(collRefRooms,where('location','==',`${location}`))
    // console.log(q)
        await getDocs(q)
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                data.push({...doc.data(),id:doc.id})
            })
        })
    }
    else{
        await getDocs(collRefRooms)
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                data.push({...doc.data(),id:doc.id})
            })
        })
    }
    console.log(data)
    res.send(data)
}


const addRoom = async (req,res) =>{
    const data = req.body
    await addDoc(collRefRooms,{...data})
    .then(() => res.sendStatus(201))

}

const productDetail = async (req,res) =>{

    const {id} = req.query
    const ref = doc(db,'Rooms',`${id}`)
    const docSnap = await getDoc(ref)
    
    console.log(docSnap.data())
    res.status(200).send(docSnap.data())
}


module.exports = {
    catalogue,
    addRoom,
    productDetail
}