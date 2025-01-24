const mongoose = require("mongoose");


const InventorySchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    product_status: {type: String, required: true},
    product_category: {type: String, required: true},
    product_location: {type: String, required: true},
    product_note: {type: String, default: ""},
    product_cost: {type: Number, required: true},
    product_resell_value: {type: Number, required: true},
    product_count: {type: Number, required: true},
})

module.exports = mongoose.model("Inventory", InventorySchema);