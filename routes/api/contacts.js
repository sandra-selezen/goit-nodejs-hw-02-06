const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')
const { isValidId, authenticate } = require('../../middlewares')

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/', authenticate, ctrlWrapper(ctrl.addContact))

router.put('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', authenticate, isValidId, ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeContact))

module.exports = router
