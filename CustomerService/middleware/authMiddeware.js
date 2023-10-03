const {getAuth} = require('firebase-admin/auth')

const authMiddleware = async(req,res,next) =>{
    const token = req.cookies.jwt
    console.log(token)
    if(token){
        getAuth()
        .verifyIdToken(token)
        .then((decodedToken) =>{
            // console.log(decodedToken.user_id)
            res.locals.id = decodedToken.user_id
            console.log(res.locals.id)
            next()
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(401)
        })
    }
    else res.sendStatus(401)
}

module.exports = authMiddleware