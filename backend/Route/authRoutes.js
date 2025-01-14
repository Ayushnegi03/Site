const express= require('express');
const datas=require('../controllers/authcontoller');
const {setUser} =require('../service/auth')
const router = express.Router();
router.route('/signup').post(datas);
router.route('/login').post(datas);
router.route('/profile/:id').put(datas)


module.exports=router;
