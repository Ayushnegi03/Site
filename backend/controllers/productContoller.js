
const mongoose = require('mongoose');
const Product = require('../Model/product'); // Ensure the path is correct

// Controller to fetch all products
// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find(); // Fetch all products
//         res.status(200).json(products);
       
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ msg: 'An error occurred while fetching products.' });
//     }
// };

const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        let products;
        let totalProducts;

        if (page && limit) {
            
            const pageNum = parseInt(page, 10) || 1;  // Default to page 1
            const limitNum = parseInt(limit, 10) || 10; // Default to 10 items per page
    
            // Calculate skip value for pagination
            const skip = (pageNum - 1) * limitNum;
          
            const products = await Product.find().skip(skip).limit(limitNum);

            // Get the total count of products
            const totalProducts = await Product.countDocuments();

            return res.status(200).json({
                totalProducts,
                totalPages: Math.ceil(totalProducts / limitNum),
                currentPage: pageNum,
                products,
            });
        } else {
            const products = await Product.find(); 
            //totalProducts = products.length;
            res.status(200).json(products);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ msg: 'An error occurred while fetching products.' });
    }
};


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
        console.log('productID',{productId})
        const { name, description, price, imageUrl, quantity, date } = req.body;
        console.log('productID',{name, description, price, imageUrl, quantity, date})
        const updatedProducting = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, imageUrl, quantity, date:date || new Date() },
            { new: true, runValidators: true }// Return the updated product
        );
         console.log('---->',updatedProducting)
         console.log('-=-=-=', { name, description, price, imageUrl, quantity, date:date || new Date() },)
        if (!updatedProducting) {
            return res.status(404).json({ msg: 'Product not found.' });
        }

        res.status(200).json(updatedProducting);
    } catch (error) {
        console.error('Error updating product:', error);
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
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found.' });
        }

        res.status(200).json({ msg: 'Product deleted successfully.', product: deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ msg: 'An error occurred while deleting the product.' });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
