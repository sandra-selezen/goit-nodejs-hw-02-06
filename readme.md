### GET /api/contacts

- Gets nothing
- Calls the listContacts function to work with the JSON file `contacts.json
- Returns an array of all contacts in json format with status 200

### GET /api/contacts/:id

- Doesn't get body
- Gets the id parameter
- Calls the getById function to work with the contacts.json JSON file
- If there is such an id, returns the contact object in JSON format with status 200
- If there is no such id, returns json with "message": "Not found" key and 404 status

### POST /api/contacts

- Gets body in {name, email, phone} format (all fields are required)
- If there are no required fields in body, returns JSON with key {"message": "missing required name field"} and status 400
- If everything is fine with body, add a unique identifier to the contact object
- Calls the addContact(body) function to save the contact in the contacts.json file
- Based on the result of the function, it returns an object with the added id {id, name, email, phone} and status 201

### DELETE /api/contacts/:id

- Doesn't get body
- Gets the id parameter
- Calls the removeContact function to work with the JSON file contacts.json
- If there is such an id, it returns JSON of the format {"message": "contact deleted"} with status 200
- If there is no such id, returns JSON with the key "message": "Not found" and status 404

### PUT /api/contacts/:id

- Gets the id parameter
- Gets body in JSON format, updating any name, email и phone fields
- If there is no body, returns json with key {"message": "missing fields"} and status 400
- If everything is fine with body, call the updateContact(contactId, body) function (write it) to update the contact in the contacts.json file
- Based on the result of the function, it returns an updated contact object with a status of 200. Otherwise, returns json with "message": "Not found" key and 404 status
