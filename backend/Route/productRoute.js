const express = require('express');
const {getProducts,createProduct,updateProduct,deleteProduct}  = require('../controllers/productContoller'); // Import the specific function
const router = express.Router();

// Define the POST route for product creation
router.route('/items').get(getProducts);
router.route('/items').post(createProduct);
router.route('/items/:productId').put(updateProduct);
router.route('/items/:productId').delete(deleteProduct);

module.exports = router;