const User = require('../models/User')
const bcrypt = require('bcrypt')
const File = require('../models/File')
const fileService = require('../service/fileServise')

class AuthController {
  async registr(req, res, next) {
    try {
    const {email, password} = req.body
    const candidat = await User.findOne({email})
    if(candidat)
      return res.status(200).json({message: 'Email уже занит', type: 'error'})      
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User ({
      email, password: hashPassword
    })
    await user.save()
    await fileService.createDir(req, new File({user:user._id, name:''}))
    res.status(201).json({message: "Ползовател создан", type: "created"})
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})
      if(!user)
        return res.status(200).json({message: 'Email не найдин', type: 'error-1'})      
      const isValidPassword = await bcrypt.compare(password, user.password)
      if(!isValidPassword)
        return res.status(200).json({message: 'Парол не правилно', type: 'error-2'}) 
      const token = user.generateAuthToken()
      res.status(200).json({message: "Пожалуста ввойдите в система", type: "success", token})
      } catch (error) {
        next(error)
      }
  }
}

module.exports = new AuthController()