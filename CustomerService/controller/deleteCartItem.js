const {db} = require('../firebaseConfig.js')
const {doc, deleteField, updateDoc } = require('firebase/firestore');

//userId and itemId to be sent from the delete button in the client

const DeleteCartItem = async (req, res) => {

try{
        const {userId, itemId} = req.body;
        
        
        const docRef = doc(db, 'users', `${userId}`);
        const updateData = {
            [`cart.${itemId}`]: deleteField(),
          };
      
          await updateDoc(docRef, updateData);
      
          return res.status(200).json({ message: 'Object deleted from cart successfully' });

    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });

 }
}
module.exports = DeleteCartItem;