const {Router} = require('express')
const {createDir, getFiles, uploadFile, downloadFile, deleteFile} = require('../controllers/fileController')
const { auth } = require('../middlewares/auth')

const router = Router()

router.post('/', auth, createDir)
router.post('/upload', auth, uploadFile)
router.get('/', auth, getFiles)
router.get('/download', auth, downloadFile)
router.delete('/', auth, deleteFile)

module.exports = router