const {Router} = require('express')
const {registr, login} = require('../controllers/authController')
const router = Router()

router.post('/registr', registr)
router.post('/login', login)

module.exports = router
