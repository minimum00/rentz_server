//itemId
//
//[{rating, review, userid}]
//
const {db} = require('../firebaseConfig')

const {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
} = require( 'firebase/firestore' );


const ReviewsTesting = async(req, res) => {
  
     try {
    const {propertyId, rating, review, userid} = req.body;

    // Check if the document already exists
    const docRef = doc(db, 'PropertyReviews', propertyId);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document already exists, update the array field
      await updateDoc(docRef, {
        [fieldName]: arrayUnion(...rating, review, userid),
      });
    } else {
      // Document doesn't exist, create a new one
      await setDoc(docRef, {
        [review]: rating,review, userid
      });
    }

    res.status(200).send('Document updated or created successfully.');
  } catch (error) {
    console.error('Error updating or creating document:', error);
    res.status(500).send('Internal Server Error');
  }

}
module.exports = ReviewsTesting;