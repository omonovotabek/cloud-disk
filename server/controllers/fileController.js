const File = require('../models/File')
const User = require('../models/User')
const fileService = require('../service/fileServise')

class FileController {
  async createDir(req, res, next) {
    try {
      const {name, type, parent} = req.body
      const file = new File({name, type, parent, user: req.user.userId})
      const parentFile = await File.findOne({_id: parent})
      if(!parentFile) {
        file.path = name
        await fileService.createDir(file)
      }else{
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (error) {
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const files = await File.find({user: req.user.userId, parent: req.query.parent})
      return res.json(files)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FileController()