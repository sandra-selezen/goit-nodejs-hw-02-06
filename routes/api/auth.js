const express = require('express')
const { users: ctrl } = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')
const { validateBody, authenticate, upload } = require('../../middlewares')
const { registerSchema, loginSchema, updateSubscriptionSchema } = require('../../schemas')

const router = express.Router()

router.post('/register', validateBody(registerSchema), ctrlWrapper(ctrl.registerUser))

router.post('/login', validateBody(loginSchema), ctrlWrapper(ctrl.loginUser))

router.patch('/subscription', authenticate, validateBody(updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscriptionUser))

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatarUser))

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrentUser))

router.post('/logout', authenticate, ctrlWrapper(ctrl.logoutUser))

module.exports = router