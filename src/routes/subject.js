const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const {
  getSubjects,
  //createSubject
} = require('~/controllers/subject')

// TODO add auth, isEntityValid, validationMiddleware middlewares
// TODO generate swagger docs for these endpoints

router.get('/', asyncWrapper(getSubjects))
// TODO uncomment to enable createSubject
//router.post('/', asyncWrapper(createSubject))

module.exports = router
