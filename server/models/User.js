const {Schema, model, Types} = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    email:{
        type: String, 
        required:true, 
        unique:true,
        minlength: 10,
    },
    password:{
        type: String, 
        required:true,    
    },
    diskSpace: {type:Number, default:1024**3*10},
    usedSpace: {type:Number, default:0},
    avatar: {type: String},
    files: [{type: Types.ObjectId, ref:'File'}]
})

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign(
       {userId: this._id},
       process.env.JWT_SECRET_KEY,
       {expiresIn: '1h'}
    )
   return token
}

module.exports = model('User', userSchema)