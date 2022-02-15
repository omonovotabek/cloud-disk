const {Schema, model, ObjectId} = require('mongoose')

const userSchema = new Schema({
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    diskSpace: {type:Number, default:1024},
    usedSpace: {type:Number, default:0},
    avatar: {type: String},
    files: [{type: ObjectId, ref:'File'}]
})

module.exports = model('User', userSchema)