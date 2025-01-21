//const Debounce = require('lodash');  //debounce
const Debounce = require('lodash.debounce');
const mongoose = require('mongoose');
const Product = require('../Model/product'); 

const getProducts =Debounce(async (req, res) => {
    const { page, limit, search } = req.query;
    try {
        
      
        if (page && limit) {
        // Default values for pagination
        const pageNum = parseInt(page, 10) || 1;  // Default to page 1
        const limitNum = parseInt(limit, 10) || 10; // Default to 10 items per page
    
        // Calculate skip value for pagination
        const skip = (pageNum - 1) * limitNum;
        
        // Construct the filter object for search
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' }},  
            ];
        }
        
        // Fetch paginated and filtered products
        const products = await Product.find(filter)
            .skip(skip)
            .limit(limitNum);
        
     
        const totalProducts = await Product.countDocuments(filter);
        
     
        return res.status(200).json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limitNum),
            currentPage: pageNum,
            products});
        } else {

            const filter = {};
            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' }},  // Case-insensitive match on name
                // You can add other fields here if necessary
                ];
            }

            const products = await Product.find(filter); 
            res.status(200).json(products);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ msg: 'An error occurred while fetching products.' });
    }
},300);


// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, quantity, date } = req.body;

        //Validate required fields
        if (!name || !description ||  !price || !imageUrl || !quantity) {
            return res.status(400).json({ msg: 'Invalid input. All fields are required: name, description, price, imageUrl, and quantity.' });
        }

        // Create a new product
        const newProduct = await Product.create({
            name,
            description,
            price,
            imageUrl,
            quantity,
            date: date || new Date(), // Default to current date if not provided
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ msg: 'An error occurred while creating the product.' });
    }
};

// Controller to update a product
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Extract product ID from URL
        const { name, description, price, imageUrl, quantity, date } = req.body;
        const updatedProducting = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, imageUrl, quantity, date:date || new Date() },
            { new: true, runValidators: true }// Return the updated product
        );
 
        if (!updatedProducting) {
            return res.status(404).json({ msg: 'Product not found.' });
        }

        res.status(200).json(updatedProducting);
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while updating the product.' });
    }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: 'Invalid product ID format.' });
        }

        // Find and delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(productId,
            {isDeleted:true,deletedAt:new Date()},
            {new:true}
        );

        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found.' });
        }

        res.status(200).json({ msg: 'Product deleted successfully.', product: deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ msg: 'An error occurred while deleting the product.' });
    }
};
// const restoreProduct = async (req, res) => {
//     try {
//       const { productId } = req.params;
//       const restoredProduct = await Product.restoreById(productId);
  
//       if (!restoredProduct) {
//         return res.status(404).json({ msg: 'Product not found or already restored' });
//       }
  
//       res.status(200).json({ msg: 'Product restored successfully', product: restoredProduct });
//     } catch (error) {
//       console.error('Error restoring product:', error);
//       res.status(500).json({ msg: 'Error restoring product' });
//     }
//   };
module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
