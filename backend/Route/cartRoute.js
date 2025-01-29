const express = require('express');
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
  addonCart
} = require('../controllers/cartcontoller');

const router = express.Router();

// Route to add a product to the cart
router.post('/add', addToCart);

// Route to get a user's cart
router.get('/:userId', getCart);

// Route to update a product quantity in the cart
router.put('/update', updateCart);


router.put ('/addon',addonCart);

// Route to remove a product from the cart
router.delete('/remove', removeFromCart);

// Route to clear the cart
router.delete('/clear', clearCart);

module.exports = router;
