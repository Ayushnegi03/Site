
const Cart = require('../Model/Cart');
const Product = require('../Model/product'); // Import the product model

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
 
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    console.log('product',product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

   
    let cartItem = await Cart.findOne({ userId, productId });
    console.log('====',cartItem)
    if (cartItem) {
      // Update quantity if the item already exists in the cart
      cartItem.quantity += quantity;
    } else {
      // Create a new cart item if it doesn't exist
      
     
    }
    // console.log('====>',cartItem)
    cartItem = new Cart({ userId, productId, quantity });
    // console.log('====+',cartItem)
    await cartItem.save();
    res.status(200).json({ message: 'Product added to cart.', cartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
};

// Get all cart items for a user
const getCart = async (req, res) => {
  const { userId} = req.params;
  // console.log("----",{userId})
  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }

  try {
    // Fetch all cart items for the user and populate product details
    const cartItems = await Cart.find({ userId }).populate('productId', 'name price imageUrl'); // Replace `name` and `price` with the actual product fields you want
    //console.log('cafrtItems',cartItems)
    // if (!cartItems.length) {
    //   return res.status(404).json({ message: 'Cart is empty.' });
    // }
//console.log(">>>>>>>>>>>>>cartItems",cartItems);
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart.' });
  }
};

// Update quantity of a product in the cart
const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the specific cart item
    let cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({
        error: 'Product not found in cart.',
      });
    }

    // Handle quantity decrementing: Only decrement if quantity is greater than 1, or remove item if quantity becomes 0 or less
    if (quantity < 1) {
      // Remove item from cart if quantity goes below 1
      await Cart.deleteOne({ userId, productId });
      return res.status(200).json({
        message: 'Product removed from cart.',
      });
    }

    // Decrement the quantity by the value provided
    cartItem.quantity -= quantity;

    // Ensure that quantity doesn't become negative
    if (cartItem.quantity < 1) {
      cartItem.quantity = 1; // Prevent negative quantity; optional based on your requirements
    }

    await cartItem.save();

    // Retrieve the updated cart
    const updatedCart = await Cart.find({ userId });

    res.status(200).json({
      message: 'Cart updated successfully.',
      updatedCart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart.' });
  }
  
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
 

  try {
    // console.log("productId",productId)
    
    const cartIteming = await Cart.findOneAndDelete({ userId, productId });


    if (!cartIteming) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    res.status(200).json({ message: 'Product removed from cart.', cartIteming });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Failed to remove product from cart.' });
  }
};

// Clear all cart items for a user
const clearCart = async (req, res) => {
  const { userId } = req.body;
  // console.log('-=-=-=',{userId})

  try {
    const result = await Cart.deleteMany({ userId });
    // console.log('result',result)

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No cart items found for user.' });
    }

    res.status(200).json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart.' });
  }
};



const addonCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
   console.log('{ userId, productId, quantity }',{ userId, productId, quantity })
  // Validate required fields
  if (!userId || !productId) {
    return res.status(400).json({
      error: 'User ID and Product ID are required.',
    });
  }
  try {
    // Find the specific cart item
    let cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      // If the product is not in the cart, add it with the provided quantity or default to 1
      cartItem = new Cart({
        userId,
        productId,
        quantity: quantity || 1, // Default to 1 if quantity is not provided
      });
      await cartItem.save();
      return res.status(201).json({
        message: 'Product added to cart.',
        cartItem,
      });
    }
    // Increment the quantity by the provided value or default to 1
    cartItem.quantity += quantity || 1;
    await cartItem.save();
    // Retrieve the updated cart
    const updatedCart = await Cart.find({ userId });

    res.status(200).json({
      message: 'Cart updated successfully.',
      updatedCart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart.' });
  }
};



module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
  addonCart
};