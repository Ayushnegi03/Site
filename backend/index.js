const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./Config/db.js');
const cors = require('cors')
const authRoutes = require('./Route/authRoutes.js');
const productRoutes = require('./Route/productRoute.js');
const personRoutes = require('./Route/personRoute.js');
const cartRoute = require('./Route/cartRoute.js')
const cookieParser = require('cookie-parser');
const admins = require('./Route/adminRoutes.js')

//const {setUser} = require('./service/auth.js')
const app = express();
dotenv.config();
app.use(cors())


app.use(express.json()); // Middleware to parse JSON payload
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(cookieParser());

connectDB();
app.use(express.json());
app.get('/',(req,res)=>{
    console.log('Here is Front End');
    res.send('<h1>Here is to show</h1>')
})

  // GET endpoint to update user data dynamically
  app.get('/person', async (req, res) => {
    try {
      const { id, name, email, phone, address } = req.query;
      // Validate that the ID is provided
      if (!id) {
        return res.status(400).json({ error: 'User ID is required to update data.' });
      }
      // Build an object with fields to update
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (phone) updateFields.phone = phone;
      if (address) updateFields.address = address;
      // Find the user and update
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true, // Return the updated document
        runValidators: true, // Apply schema validation
      });
      // If user not found
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      // Send success response
      res.json({
        message: 'User data updated successfully!',
        userData: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ error: 'An error occurred while updating user data.' });
    }
  });

app.use('/auth',authRoutes);
app.use('/product', productRoutes);
app.use('/person', personRoutes);
app.use('/cart',cartRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});
