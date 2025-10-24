const router = require('express').Router()
const asyncWrapper = require('~/middlewares/asyncWrapper')
const isEntityValid = require('~/middlewares/entityValidation')
const idValidation = require('~/middlewares/idValidation')
const { authMiddleware } = require('~/middlewares/auth')
const validationMiddleware = require('~/middlewares/validation')
const {
  createSubjectValidationSchema,
  updateSubjectValidationSchema
} = require('~/validation/schemas/subject')
const Subject = require('~/models/subject')

const {
  getSubjects,
  getSubjectsNames,
  getSubject,
  createSubject,
  updateSubject,
  // deleteSubject
} = require('~/controllers/subject')

const params = [{ model: Subject, idName: 'id' }]

// router.use(authMiddleware)
router.param('id', idValidation)

// TODO add auth, isEntityValid, validationMiddleware middlewares
// TODO generate swagger docs for these endpoints

router.get('/', asyncWrapper(getSubjects))
router.get('/names', asyncWrapper(getSubjectsNames))
router.get('/:id', isEntityValid({ params }), asyncWrapper(getSubject))
router.post('/', validationMiddleware(createSubjectValidationSchema), asyncWrapper(createSubject))
router.patch('/:id',
  isEntityValid({ params }),
  validationMiddleware(updateSubjectValidationSchema),
  asyncWrapper(updateSubject)
)
// TODO uncomment to enable subject deletion
// router.delete('/:id', isEntityValid({ params }), asyncWrapper(deleteSubject))

module.exports = router
