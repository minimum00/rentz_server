const {db,storage,admin} = require('../firebaseConfig.js')
const {getDocs,addDoc,collection,doc,getDoc,query,where} = require('firebase/firestore')
const {getDownloadURL, ref} = require('firebase/storage')
// const admin = require('firebase-admin')

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

const uploadFormData = async(req,res) =>{
    
    const bucket = admin.storage().bucket('gs://testserverdatabase.appspot.com')

    const {propertyImage,roomImage} = req.files
    const data = req.body
    console.log({...data})
    // const fileName = propertyImage.originalname; // Name of the file
    // const mimetype = propertyImage.mimetype

    // const expirationDate = new Date();
    // expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    
    try{
        const savePropertyImage = propertyImage.map(async(item) =>{
            
            const mimetype = item.mimetype
            const destination = `propertyImage/${item.originalname}`;
            const file =  bucket.file(destination)

            await file.save(item.buffer, {
                metadata: {
                  contentType: mimetype
                },
            });

            const storagePropertyRef = ref(storage,`propertyImage/${item.originalname}`)
            const imageUrl = await getDownloadURL(storagePropertyRef)
           
            // const [url] = await file.getSignedUrl({
            //     action:'read',
            //     expires:expirationDate
            // })

            return {imageUrl}
        })

        Promise.all(savePropertyImage)
        .then((propertyImageUrl) =>{
            
            console.log(propertyImageUrl)

            const saveRoomImage = roomImage.map(async(item) =>{
            
                const mimetype = item.mimetype
                const destination = `roomImage/${item.originalname}`;
                const file =  bucket.file(destination)
    
                await file.save(item.buffer, {
                    metadata: {
                      contentType: mimetype
                    },
                });

                const storageRoomRef = ref(storage,`roomImage/${item.originalname}`)
                const imageUrl = await getDownloadURL(storageRoomRef)
        
                // const [url] = await file.getSignedUrl({
                //     action:'read',
                //     expires:expirationDate
                // })
    
                return {imageUrl}
            })

            Promise.all(saveRoomImage)
            .then(async (roomImageUrl) =>{
                console.log([...roomImageUrl])

                    const dataForStore = {
                        ...data,
                        propertyImage:propertyImageUrl,
                        roomImage:roomImageUrl
                    }
                    // console.log(dataForStore)
                
                    await addDoc(collRefRooms,{...dataForStore})
                    .then((response) =>{
                        console.log('file added succesfully')
                        console.log(response.id)
                    })
                    .catch(err =>{
                        console.log('error in addind files to firestore')
                        console.log(err)
                    })
            })
            .catch((err) => console.log(err))
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    catch(err){
        console.log('error in code blocks')
    }
    res.sendStatus(200)
}


module.exports = {
    catalogue,
    addRoom,
    productDetail,
    uploadFormData
}