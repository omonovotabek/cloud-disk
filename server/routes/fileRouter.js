const {Router} = require('express')
const {createDir, getFiles} = require('../controllers/fileController')
const { auth } = require('../middlewares/auth')

const router = Router()

router.post('/', auth, createDir)
router.get('/', auth, getFiles)

module.exports = router