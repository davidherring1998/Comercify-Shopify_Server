# Comercify Shopify Server

This is a Node.js and GraphQL server for managing inventory and daily notes. It is designed to work with MongoDB for data storage and is capable of creating, editing, deleting, and retrieving inventory items and notes.

---

## Features

### Inventory Management
- Add, edit, and delete inventory items.
- Retrieve all inventory items or specific ones by their ID.
- Store product details such as name, status, category, location, cost, resale value, and more.

### Notes Management
- Add, edit, and delete daily notes.
- Retrieve all notes or specific ones by their ID.
- Notes include a title, content, and date for tracking purposes.

---

## Technologies Used

- **Node.js**: Backend runtime.
- **GraphQL**: Query language for the API.
- **Apollo Server**: GraphQL server implementation.
- **MongoDB**: Database for storing inventory and notes.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **dotenv**: For managing environment variables.

---

## Setup Instructions
---------------------

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) account or a local MongoDB instance.

- A GitHub account for version control.

### Installation
Clone the repository:

git clone https://github.com/<your-username>/
<repo-name>.git

cd <repo-name>

npm install

MONGO_URI=<your-mongodb-connection-string>


## Folder Structure
-------------------
src/
├── graphql/
│   ├── resolvers.js       # GraphQL resolvers
│   ├── typeDefs.js        # GraphQL type definitions
├── models/
│   ├── Inventory.js       # Inventory schema
│   ├── Note.js            # Note schema
├── db.js                  # MongoDB connection
├── index.js               # Server entry point
.env                       # Environment variables
package.json               # Project metadata and dependencies

## API Endpoints
----------------
# GraphQL Queries
returnInventory: Fetch all inventory items.

returnNotes: Fetch all notes.

returnNoteById(id: ID!): Fetch a specific note by its ID.

# GraphQL Mutations
createInventory(input: InventoryInput!): Add a new inventory item.

editInventory(id: ID!, input: InventoryInput!): Edit an inventory item.

deleteInventoryItem(id: ID!): Delete an inventory item.

createNote(input: NoteInput!): Add a new note.

editNote(id: ID!, input: NoteInput!): Edit a note.

deleteNote(id: ID!): Delete a note.
