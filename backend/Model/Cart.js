

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
   
});

module.exports = mongoose.model('carts', cartSchema);
