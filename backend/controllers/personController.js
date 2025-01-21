// const Person = require('../Model/users');

// // Create a new person
// const createPerson = async (req, res) => {
//   try {
//     const { name,phone, email, address } = req.body;

//     const newPerson = new Person({ name,phone, email, address });
//     console.log(newPerson)
//     await newPerson.save();

//     res.status(201).json({
//       message: 'Person created successfully!',
//       userId: newPerson._id,
//       data: newPerson,
     
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       // Handle unique field error
//       return res.status(400).json({ error: 'Email or Contact already exists!' });
//     }
//     res.status(500).json({ error: 'An error occurred while creating the person.' });
//   }
// };

// // Get all persons
// const getAllPersons = async (req, res) => {
//   try {
//     const persons = await Person.find();
//     res.status(200).json(persons);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching persons.' });
//   }
// };

// // Get a single person by ID
// const getPersonById = async (req, res) => {
//   try {
//     const person = await Person.findById(req.params.id);
//     console.log(person)
//     if (!person) {
//       return res.status(404).json({ error: 'Person not found.' });
//     }
//     res.status(200).json(person);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching the person.Not Found' });
//   }
// };

// // Update a person
// const updatePerson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, address, contact,email } = req.body;
//     const newPerson = new Person({ name, address, contact,email } );
//     console.log('PErosen',newPerson)
//     await newPerson.save();
//     // const updatedPerson = await Person.findByIdAndUpdate(id, { name, email, address, contact }, {
//     //   new: true, // Return the updated document
//     //   runValidators: true, // Ensure validation rules are applied
//     // });
//     //const updatedPerson = await Person.findById(id)
//     const updatedPerson = await User.findByIdAndUpdate(
//       id, 
//       { name, address, contact} , // Fields to update
//       {
//         new: true,          // Return the updated document
//         runValidators: true // Ensure schema validation rules apply
//       }
//     );
//      console.log("------",updatedPerson);

//     if (!updatedPerson) {
//       return res.status(404).json({ error: 'Person not found.' });
//     }

//     res.status(200).json({
//       message: 'Person updated successfully!',
//       data: updatedPerson,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while updating the person.' });
//   }
// };

// // Delete a person
// const deletePerson = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedPerson = await Person.findByIdAndDelete(id);
//     if (!deletedPerson) {
//       return res.status(404).json({ error: 'Person not found.' });
//     }

//     res.status(200).json({ message: 'Person deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting the person.' });
//   }
// };

// module.exports = {
//   createPerson,
//   getAllPersons,
//   getPersonById,
//   updatePerson,
//   deletePerson,
// };



// /*
// const Cart = require('../Model/Cart'); // Import the Cart model
// const Product = require('../Model/product'); // Import the Product model (if needed)

// // Add a product to the cart
// const addToCart = async (req, res) => {
//   const { userId, productId, quantity = 1 } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       // Check if product already exists in the cart
//       const productIndex = cart.products.findIndex(
//         (product) => product.productId.toString() === productId
//       );

//       if (productIndex > -1) {
//         // Update the quantity if the product exists
//         cart.products[productIndex].quantity += quantity;
//       } else {
//         // Add new product to the cart
//         cart.products.push({ productId, quantity });
//       }
//     } else {
//       // Create a new cart for the user
//       cart = new Cart({
//         userId,
//         products: [{ productId, quantity }],
//       });
//     }

//     await cart.save();
//     res.status(200).json({ message: 'Product added to cart successfully.', cart });
//   } catch (error) {
//     console.error('Error adding product to cart:', error);
//     res.status(500).json({ error: 'Failed to add product to cart.' });
//   }
// };

// // Get user's cart
// const getCart = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await Cart.findOne({ userId }).populate('products.productId');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found.' });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     res.status(500).json({ error: 'Failed to fetch cart.' });
//   }
// };

// // Update product quantity in the cart
// const updateCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId });

//     if (cart) {
//       const productIndex = cart.products.findIndex(
//         (product) => product.productId.toString() === productId
//       );

//       if (productIndex > -1) {
//         if (quantity > 0) {
//           // Update the quantity if greater than 0
//           cart.products[productIndex].quantity = quantity;
//         } else {
//           // Remove the product if quantity is 0
//           cart.products.splice(productIndex, 1);
//         }

//         await cart.save();
//         res.status(200).json({ message: 'Cart updated successfully.', cart });
//       } else {
//         res.status(404).json({ message: 'Product not found in cart.' });
//       }
//     } else {
//       res.status(404).json({ message: 'Cart not found.' });
//     }
//   } catch (error) {
//     console.error('Error updating cart:', error);
//     res.status(500).json({ error: 'Failed to update cart.' });
//   }
// };

// // Remove a product from the cart
// const removeFromCart = async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId });

//     if (cart) {
//       cart.products = cart.products.filter(
//         (product) => product.productId.toString() !== productId
//       );

//       await cart.save();
//       res.status(200).json({ message: 'Product removed from cart.', cart });
//     } else {
//       res.status(404).json({ message: 'Cart not found.' });
//     }
//   } catch (error) {
//     console.error('Error removing product from cart:', error);
//     res.status(500).json({ error: 'Failed to remove product from cart.' });
//   }
// };

// // Clear the cart
// const clearCart = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const cart = await Cart.findOneAndDelete({ userId });

//     if (cart) {
//       res.status(200).json({ message: 'Cart cleared successfully.' });
//     } else {
//       res.status(404).json({ message: 'Cart not found.' });
//     }
//   } catch (error) {
//     console.error('Error clearing cart:', error);
//     res.status(500).json({ error: 'Failed to clear cart.' });
//   }
// };

// module.exports = {
//   addToCart,
//   getCart,
//   updateCart,
//   removeFromCart,
//   clearCart,
// };
// */
