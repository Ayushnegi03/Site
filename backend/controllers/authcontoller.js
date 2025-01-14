const User = require('../Model/users');
const PersonSchema=require('../Model/Cart');
const express=require('express');
const bcrypt = require('bcrypt');
const {product,generateToken}=require('../middleware/authMiddleware')
const auth=express.Router()
auth.post('/signup', async (req, res) => {
    console.log('body', req.body)
    try {
        const { username, email, password ,role } = req.body;
        // console.log('data' ,username , email , password , role)
      
        if (!username || !email || !password) {
            return res.status(403).json({ msg: 'All fields are required' });
        }
        if (role === 1){
            const existingAdmin = await User.findOne({role:1});
            if (existingAdmin){
                return res.status(400).json({message:'Already Admin exist'})
            }
           }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ msg: 'User already exists with this email' });
        }
        const hashedPassword = await bcrypt.hash(password, 12); // Higher saltRounds for better security
        const newUser = new User({ username, email, password: hashedPassword ,role:role === 1 ? 1:0});
        const response = await newUser.save();
//
        const token = generateToken({ id: response._id, email: response.email,role:response.role});
        return res.status(201).json({
            success: true,
            msg: 'User registered successfully',
            user: { id: response._id, username: response.username, email: response.email },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server error. Please try again later.' });
    }
});

auth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for required fields
        if ( !email || !password) {
            return res.status(400).json({ msg: 'Username, Email, and Password are required' });
        }
        // Check if user exists
        const existingUser = await User.findOne({ email });
       // const user=await PersonSchema.findOne({email});
        //console.log(">>>>>>>>>>>>>>user",user);
        console.log(">>>>>>>>>>>>>>>>>>>>>>existingUser",existingUser);
        if (!existingUser) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }
        // Generate token
        const token = generateToken({
            id: existingUser._id,
            email: existingUser.email, 
            role:existingUser.role,         
        });
        return res.status(200).json({ 
            user: {
                id:existingUser._id,
                username:existingUser.username,
                token:token,
                email:existingUser.email,
                name:existingUser.name,
                address:existingUser.address,
                contact:existingUser.contact,
                role:existingUser.role ,     

            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false , message: err.message });
    }
});  
auth.put('/profile/:id', async (req, res) => {
    try {
      const { id } = req.params; // Extract user ID from the URL
      const { name, email, address, contact ,role } = req.body; // Extract data from the request body
      console.log(">>>>>>name, email, address, contact",name, email, address, contact,role);
      // Validate input
      if (!name || !email || !address || !contact ) {
        return res.status(400).json({ msg: 'All fields are required' });
      }
      // Find the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, address, contact ,role }, // Update fields
        { new: true } // Return the updated document
      );
       console.log('-==--=-==-',updatedUser)
      // Check if the user exists
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
      // Respond with the updated user data
      return res.status(200).json({
        success: true,
        msg: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Server error. Please try again later.' });
    }
  });
module.exports=auth
