const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//типы может добавлять только админ поэтому прверяем роль checkRole('ADMIN')
router.post('/', checkRole('ADMIN'), typeController.create)//т
router.get('/', typeController.getAll)

module.exports = router
