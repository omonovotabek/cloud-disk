const File = require('../models/File')
const User = require('../models/User')
const fs = require('fs')
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

  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const parent = await File.findOne({user: req.user.userId, _id: req.body.parent})
      const user = await User.findOne({_id: req.user.userId})
      if(user.usedSpace + file.size > user.diskSpace) {
        return res.status(200).json({message: 'There no space on the disk'})
      }
      user.usedSpace = user.usedSpace + file.size
      let path;
      if(parent) {
        path = `${process.env.filePath}\\${user._id}\\${parent.path}\\${file.name}`
      }else {
        path = `${process.env.filePath}\\${user._id}\\${file.name}`
      }
      if(fs.existsSync(path)) {
        return res.status(200).json({message: 'File already exist'})
      }
      file.mv(path)
      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
          filePath = parent.path + "\\" + file.name
      }
      const dbFile = new File ({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id
      })
      // console.log(parent.path);
      await dbFile.save()
      await user.save()
      res.json(dbFile)
    } catch (error) {
      next(error)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.userId})
      const path = process.env.filePath + '\\' + file.user + '\\' + file.path
      if(fs.existsSync(path)){
        return res.download(path, file.name)
      }
      return res.status(200).json({message: 'Download error'})
    } catch (error) {
      next(error)
    }
  }

  async deleteFile(req, res, next) {
    try {
      const file = await File.findOne({_id:req.query.id, user:req.user.userId})
      if(!file){
        return res.status(200).json({message: 'File not faund'})
      }
      fileService.deleteFile(file)
      await file.remove()
      return res.json(file)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FileController()