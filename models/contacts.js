const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath)
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId)
    return result || null
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = {
      id: nanoid(),
      ...body,
    }
    contacts.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
      return null
    }
    contacts[index] = { contactId, ...body }
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return contacts[index]
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
      return null
    }
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return result
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
