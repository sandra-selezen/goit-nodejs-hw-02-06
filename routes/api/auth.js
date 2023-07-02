const express = require('express')
const { users: ctrl } = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')
const { validateBody, authenticate } = require('../../middlewares')
const { registerSchema, loginSchema } = require('../../schemas')

const router = express.Router()

router.post('/register', validateBody(registerSchema), ctrlWrapper(ctrl.registerUser))

router.post('/login', validateBody(loginSchema), ctrlWrapper(ctrl.loginUser))

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrentUser))

router.post('/logout', authenticate, ctrlWrapper(ctrl.logoutUser))

module.exports = router