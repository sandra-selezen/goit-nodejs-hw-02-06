const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { ctrlWrapper } = require('../../helpers')
const { isValidId } = require('../../middlewares')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/', ctrlWrapper(ctrl.addContact))

router.put('/:contactId', isValidId, ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact))

module.exports = router
