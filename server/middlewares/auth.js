const jwt = require('jsonwebtoken')
 

module.exports.auth = (req, res, next) => {
    const token = req.header('x-auth-token')
     if(!token)
       return res.status(401).send('Token bo\'lmaganligi sababli murojat rad etildi')

     try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
         req.user = decoded
         next()
     } catch (e) {
         return res.status(400).send('Yaroqsiz token')
     }
}