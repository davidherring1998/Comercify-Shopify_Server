// TypeDefs for main inventory
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Inventory {
    id: ID
    product_name: String!
    product_status: String!
    product_category: String!
    product_location: String!
    product_note: String
    product_cost: Float
    product_resell_value: Float
    product_count: Int!
  }

  input InventoryInput {
    product_name: String!
    product_status: String!
    product_category: String!
    product_location: String!
    product_note: String
    product_cost: Float
    product_resell_value: Float
    product_count: Int!
  }

  # Notes
  type Note {
    id: ID!
    title: String!
    content: String!
    date: String!
  }

  input NoteInput {
    title: String!
    content: String!
  }

  type Query {
    hello: String
    returnInventory: [Inventory]

    returnNotes: [Note]
    returnNoteById(id: ID!): Note
  }

  type Mutation {
    createInventory(input: InventoryInput!): Inventory
    editInventory(id: ID!, input: InventoryInput!): Inventory
    deleteInventoryItems(ids: [ID!]!): String

    createNote(input: NoteInput!): Note
    editNote(id: ID!, input: NoteInput!): Note
    deleteNote(id: ID!): String
  }
`;

module.exports = typeDefs;
