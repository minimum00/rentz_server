const {db} = require('../firebaseConfig.js')
const {doc,getDoc,updateDoc,setDoc, deleteField} = require('firebase/firestore')
const crypto = require('crypto')

const addItemToCart = async(req,res) =>{
    const id = res.locals.id
    const data = req.body
    const docRef = doc(db,'users',`${id}`)
    const random = crypto.randomBytes(8)
  

    await setDoc(docRef,{
        cart:{[data.id]:{...data}}
    },{merge:true})
    .then(() => res.send(201))
}

const getCartItem = async(req,res) =>{
    const id= res.locals.id
    const docRef = doc(db,'users',`${id}`)
    const { specific } = req.query;
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()

    // const keys = Object.keys(data.cart)

    // keys.map(element => {
    //     // element.map(([item,value]) => console.log(value))
    //     console.log(typeof(element))
    // });

    // data.cart.forEach(element => {
    //     console.log(element)
    // });
    // for (const value of Object.values(data.cart)) {
    //     console.log(`${value.userID}`);
    //   }
      
    if(specific !== undefined){
        const allId = [];
        for(const value of Object.values(data.cart)) {
            allId.push(value.id);
            console.log(allId);
        }
        res.status(200).send(data.cart)
    } else {
        res.status(200).send(data.cart);
    }

}
const DeleteCartItem = async (req, res) => {

    try{
            const userId = res.locals.id
            const { propertyID } = req.query
            console.log('userId', userId)
            console.log('propertyId', propertyID)
            
            const docRef = doc(db, 'users', `${userId}`);
            const updateData = {
                [`cart.${propertyID}`]: deleteField(),
              };
          
              await updateDoc(docRef, updateData);
          
              return res.status(200).json({ message: 'Object deleted from cart successfully' });
    
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong' });
    
     }
    }


module.exports = {
    
    addItemToCart,
    DeleteCartItem,
    getCartItem
}