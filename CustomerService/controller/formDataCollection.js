const {db, storage, admin} = require('../firebaseConfig');
const { setDoc, doc } = require('firebase/firestore')
const {ref,  getDownloadURL, listAll} = require('firebase/storage');

//userId is there just for testing it'll originally be pulled from authMiddleware
// const gatherData = async (req, res) => {
//     const bucket = admin.storage().bucket('gs://testserverdatabase.appspot.com');
//     const {propertyImage,roomImage} = req.files

    // console.log('propertyImage', propertyImage)
    // console.log('propertyImages: ', propertyImage);
    // console.log('roomImages', roomImage);

   
  
    
    const gatherData = async(req,res) =>{
      const { propertyName, location, propertyInfo, userId, BhkType, price } = req.body;
    
      const propertyImages = [];
      const roomImages = [];
    
        const bucket = admin.storage().bucket('gs://testserverdatabase.appspot.com')
    
        const {propertyImage,roomImage} = req.files
       
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 10);
        
        try{
            const savePropertyImage = propertyImage.map(async(item) =>{
                
                const mimetype = item.mimetype
                const destination = `${propertyName}/${item.originalname}`;
                const file =  bucket.file(destination)
    
                await file.save(item.buffer, {
                    metadata: {
                      contentType: mimetype
                    },
                });
    
               
                const [url] = await file.getSignedUrl({
                    action:'read',
                    expires:expirationDate
                })
    
                return {url}
            })
    
            Promise.all(savePropertyImage)
            .then((propertyImageUrl) =>{
                //url obtained for propertyImage
                console.log('image Urls of propertyImages', propertyImageUrl)
           
                //store this into temporary array because we excute wire function to firebase later
    
              console.log('propertyImages Folder', propertyImages);
                //storing and creating roomImages and obtaining respective url's for final execution
                //this part has to optimized maybe create custom modules for this function
    
                const saveRoomImage = roomImage.map(async(item) =>{
                
                    const mimetype = item.mimetype
                    const destination = `roomImage/${item.originalname}`;
                    const file =  bucket.file(destination)
        
                    await file.save(item.buffer, {
                        metadata: {
                          contentType: mimetype
                        },
                    });
        
                    const [url] = await file.getSignedUrl({
                        action:'read',
                        expires:expirationDate
                    })
        
                    return {url}
                })
    
                Promise.all(saveRoomImage)
                .then(async (roomImageUrl) =>{
                     //now obtained both proertyImage and roomImage urls
                     //firestore write document code here
                     //with data in req.body and both url's to respective array
                    console.log('propertyImage Urls inside promise block of roomImage', propertyImageUrl )
                    console.log('roomImage Urls of ', roomImageUrl)
                    const docRef = doc(db, 'Rooms', `${propertyName}`);
                    await setDoc(docRef, {
                      propertyName,
                      location,
                      roomImageUrl,
                      propertyImageUrl,
                      propertyInfo,
                      BhkType,
                      price
                    });
                
                })
                .catch((err) => console.log(err))
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        catch{
    
        }
        res.sendStatus(200)
    }
  //   try {
  //     for (const file of propertyImage) {
  //       const folderName = `${propertyName}_propertyImages`;
  //       const fileName = file.originalname;
  //       const destination = `${folderName}/${fileName}`;
  //       const imageBuffer = file.buffer;
  //       const mimetype = file.mimetype;
  
  //       await bucket.file(destination).save(imageBuffer, {
  //         metadata: {
  //           contentType: mimetype,
  //         },
  //       });
  //     }
  //     const propertyFolderRef = ref(storage, `${propertyName}_propertyImages`);
  //     const propertyListResult = await listAll(propertyFolderRef);
  //     console.log('list Result =', propertyListResult);
  
  //     for (const imageItem of propertyListResult.items) {
  //       console.log('image item is', imageItem);
  //       const imageUrl = await getDownloadURL(imageItem);
  //       propertyImages.push(imageUrl);
  //     }
  

  //     for (const file of roomImage) {
  //       const folderName = `${propertyName}_roomImages`;
  //       const fileName = file.originalname;
  //       const destination = `${folderName}/${fileName}`;
  //       const imageBuffer = file.buffer;
  //       const mimetype = file.mimetype;
  
  //       await bucket.file(destination).save(imageBuffer, {
  //         metadata: {
  //           contentType: mimetype,
  //         },
  //       });
  //     }
  
  //     const roomFolderRef = ref(storage, `${propertyName}_roomImages`);
  //     const roomListResult = await listAll(roomFolderRef);
  //     console.log('list Result =', roomListResult);
  
  //     for (const imageItem of roomListResult.items) {
  //       console.log('image item is', imageItem);
  //       const imageUrl = await getDownloadURL(imageItem);
  //       roomImages.push(imageUrl);
  //     }
  
  //     console.log('Image URLs:', propertyImages);
  
  //     // Now, you can send the imageUrls to Firestore or perform other operations.
  
      // const docRef = doc(db, 'Rooms', `${userId}`);
      // await setDoc(docRef, {
      //   propertyName,
      //   location,
      //   roomImages,
      //   propertyImages,
      //   propertyInfo,
      //   BhkType,
      //   price
      // });
  
  //     // Send a success response when all files are saved
  //     res.status(200).json({ message: 'Data uploaded successfully', propertyImages });
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle the error here, you can send an error response to the client
  //     res.status(500).json({ error: 'Something went wrong', message: error.message });
  //   }
   
  
  module.exports = gatherData;
  