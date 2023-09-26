const {auth} = require('../firebaseConfig.js')
const { signOut } = require('firebase/auth') 


const UserLogOut = async(req, res) => {
    try{
    
            const user = req.body
            console.log('userObject is ', user)
            res.clearCookie('jwt');
           
            await signOut(auth);
      
            return res.status(200).json({ message: 'User logged out successfully' });
          
      
       
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
module.exports = UserLogOut;