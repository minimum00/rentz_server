const {db, storage, admin} = require('../firebaseConfig');
const { setDoc, doc } = require('firebase/firestore')
const {ref,  getDownloadURL, listAll} = require('firebase/storage');

//userId is there just for testing it'll originally be pulled from authMiddleware
const gatherData = async (req, res) => {
    const bucket = admin.storage().bucket('gs://testserverdatabase.appspot.com');
    const propertyImage = req.files;
    console.log('propertyImage', propertyImage)
    // const roomImage = req.files.filter(file => file.fieldName === 'roomImage');
    const { propertyName, location, propertyInfo, userId, BhkType, price } = req.body;
  
    const propertyImages = [];
    const roomImages = [];
  
    try {
      for (const file of propertyImage) {
        const folderName = `${propertyName}_propertyImages`;
        const fileName = file.originalname;
        const destination = `${folderName}/${fileName}`;
        const imageBuffer = file.buffer;
        const mimetype = file.mimetype;
  
        await bucket.file(destination).save(imageBuffer, {
          metadata: {
            contentType: mimetype,
          },
        });
      }
      const propertyFolderRef = ref(storage, `${propertyName}_propertyImages`);
      const propertyListResult = await listAll(propertyFolderRef);
      console.log('list Result =', propertyListResult);
  
      for (const imageItem of propertyListResult.items) {
        console.log('image item is', imageItem);
        const imageUrl = await getDownloadURL(imageItem);
        propertyImages.push(imageUrl);
      }
  

    //   for (const file of roomImage) {
    //     const folderName = `${propertyName}_roomImages`;
    //     const fileName = file.originalname;
    //     const destination = `${folderName}/${fileName}`;
    //     const imageBuffer = file.buffer;
    //     const mimetype = file.mimetype;
  
    //     await bucket.file(destination).save(imageBuffer, {
    //       metadata: {
    //         contentType: mimetype,
    //       },
    //     });
    //   }
  
    //   const roomFolderRef = ref(storage, `${propertyName}_roomImages`);
    //   const roomListResult = await listAll(roomFolderRef);
    //   console.log('list Result =', roomListResult);
  
    //   for (const imageItem of roomListResult.items) {
    //     console.log('image item is', imageItem);
    //     const imageUrl = await getDownloadURL(imageItem);
    //     roomImages.push(imageUrl);
    //   }
  
      console.log('Image URLs:', propertyImages);
  
      // Now, you can send the imageUrls to Firestore or perform other operations.
  
      const docRef = doc(db, 'Rooms', `${userId}`);
      await setDoc(docRef, {
        propertyName,
        location,
        roomImages,
        propertyImages,
        propertyInfo,
        BhkType,
        price
      });
  
      // Send a success response when all files are saved
      res.status(200).json({ message: 'Data uploaded successfully', propertyImages });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here, you can send an error response to the client
      res.status(500).json({ error: 'Something went wrong', message: error.message });
    }
  };
  
  module.exports = gatherData;
  