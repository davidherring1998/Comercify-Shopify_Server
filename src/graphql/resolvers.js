const Inventory = require("../models/Inventory");
const Note = require("../models/Note");

const resolvers = {
  Query: {
    hello: () => "Hello, World!",

    returnInventory: async () => {
      try {
        const inventory = await Inventory.find();

        if (!inventory || inventory.length === 0) {
          throw new Error("No inventory items found.");
        }

        return inventory.map((item) => ({
          id: item._id.toString(),
          product_name: item.product_name,
          product_status: item.product_status,
          product_category: item.product_category,
          product_location: item.product_location,
          product_note: item.product_note,
          product_cost: item.product_cost,
          product_resell_value: item.product_resell_value,
          product_count: item.product_count,
        }));
      } catch (err) {
        console.error("Error fetching inventory:", err.message);
        throw new Error("Unable to fetch inventory items.");
      }
    },

    // Note queries
    returnNotes: async () => {
      try {
        const notes = await Note.find().sort({ date: -1 });
        if (notes.length === 0) {
          throw new Error("No notes where found.");
        }
        return notes;
      } catch (error) {
        console.error("Error fetching notes:", error.message);
        throw new Error(error.message || "Unable to fetch notes.");
      }
    },

    returnNoteById: async (_, { id }) => {
      try {
        const note = await Note.findById(id);
        if (!note) {
          throw new Error("Note not found");
        }
        return note;
      } catch (error) {
        console.error("Error fetching note by ID:", error.message);
        throw new Error(error.message || "Unable to fetch the note.");
      }
    },
  },

  Mutation: {
    createInventory: async (_, { input }) => {
      try {
        if (!input.product_name || !input.product_status) {
          throw new Error(
            "Missing required fields: product_name or product_status."
          );
        }
        const newInventory = new Inventory(input);

        const savedInventory = await newInventory.save();

        return {
          id: savedInventory._id.toString(),
          product_name: savedInventory.product_name,
          product_status: savedInventory.product_status,
          product_category: savedInventory.product_category,
          product_location: savedInventory.product_location,
          product_note: savedInventory.product_note,
          product_cost: savedInventory.product_cost,
          product_resell_value: savedInventory.product_resell_value,
          product_count: savedInventory.product_count,
        };
      } catch (error) {
        console.error("Error creating inventory:", error.message);
        throw new Error(
          "Unable to create inventory item. Please verify your input."
        );
      }
    },

    editInventory: async (_, { id, input }) => {
      try {
        if (!id) {
          throw new Error("ID is required to edit a note.");
        }

        if (!input) {
          throw new Error("Invalid input.");
        }

        const updatedInventory = await Inventory.findByIdAndUpdate(id, input, {
          new: true,
        });

        if (!updatedInventory) {
          throw new Error(`Inventory item not found for ID: ${id}`);
        }

        return {
          id: updatedInventory._id.toString(), // 🔥 Ensure ID is correctly formatted
          product_name: updatedInventory.product_name,
          product_status: updatedInventory.product_status,
          product_category: updatedInventory.product_category,
          product_location: updatedInventory.product_location,
          product_note: updatedInventory.product_note,
          product_cost: updatedInventory.product_cost,
          product_resell_value: updatedInventory.product_resell_value,
          product_count: updatedInventory.product_count,
        };
      } catch (error) {
        console.error("Error editing inventory:", error);
        throw new Error("Unable to edit inventory item");
      }
    },

    deleteInventoryItem: async (_, { id }) => {
      try {
        if (!ids || ids.length === 0) {
          throw new Error("IDs are required to delete inventory items.");
        }

        const deletedInventory = await Inventory.deleteMany({
          _id: { $in: ids },
        });

        if (!deletedInventory.deletedCount) {
          throw new Error("No inventory items were deleted.");
        }

        return `Deleted ${deletedInventory.deletedCount} inventory items.`;
      } catch (error) {
        console.error("Error deleting inventory:", error.message);
        throw new Error("Unable to delete inventory item.");
      }
    },

    // Note mutation
    createNote: async (_, { input }) => {
      try {
        const newNote = new Note(input);
        const savedNote = await newNote.save();
        return savedNote;
      } catch (error) {
        console.error("Error creating note:", error.message);
        throw new Error("unable to create note.");
      }
    },

    editNote: async (_, { id, input }) => {
      try {
        if (!id) {
          throw new Error("ID is required to edit a note.");
        }
        if (!input || (!input.title && !input.content)) {
          throw new Error("Invalid input. Title or content is required.");
        }

        const updatedNote = await Note.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
        });

        if (!updatedNote) {
          throw new Error(`Note with ID ${id} not found.`);
        }

        return updatedNote;
      } catch (error) {
        console.error("Error editing note:", error.message);
        throw new Error("Unable to edit note. " + error.message);
      }
    },

    deleteNote: async (_, { id, input }) => {
      try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
          throw new Error("Note not found.");
        }
        return `Note with id ${id} has been deleted successfully.`;
      } catch (error) {
        console.error("Error deleting note:", error.message);
        throw new Error("Unable to delete note.");
      }
    },
  },
};

module.exports = resolvers;
