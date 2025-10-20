const router = require('express').Router()
const userController = require('~/controllers/user')
const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { restrictTo, authMiddleware } = require('~/middlewares/auth')
const isEntityValid = require('~/middlewares/entityValidation')
const fileValidationMiddleware = require('~/middlewares/fileValidation')
const upload = require('~/middlewares/multer')
const User = require('~/models/user')
const {
  roles: { ADMIN }
} = require('~/consts/auth')
const fileValidationSchema = require('~/validation/schemas/file')

const params = [{ model: User, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(userController.getUsers))
router.get('/:id', isEntityValid({ params }), asyncWrapper(userController.getUserById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(userController.updateUser))
router.post('/:id/upload-photo',
  isEntityValid({ params }),
  upload.single('file'),
  fileValidationMiddleware(fileValidationSchema),
  asyncWrapper(userController.uploadPhoto)
)

router.use(restrictTo(ADMIN))
router.patch('/:id/change-status', isEntityValid({ params }), asyncWrapper(userController.updateStatus))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(userController.deleteUser))

module.exports = router
