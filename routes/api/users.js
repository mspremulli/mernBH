const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const { secretOrKey } = require('../../config');

const User = requrire('../models/User.js');

//@route POST api/users
//@desc create new user. NOTE: add validation later
//@access Public
router.post(
  '/' ,
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be 6-20 characters').isLength({min:6, max: 20})
  ], 
  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({errors: errors.array()})
    }
    try {

      const userData = {
        email:req.body.email,
        password:req.body.password
      }

      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      
      const user = await User.create(userData);
      return res.json(user);
      
      
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

// @route PUT api/users
// @desc login a new user
// @access Public
router.put(
  '/',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty()
  ],
  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({errors: errors.array()})
    }
    try {
      const user = await User.findOne({email: req.body.email});
      if(isEmpty(user)){
        return res.status(404).json({errors:{message: 'user not found'}})
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if(!isMatch) {
        return res.status(403).json({errors: {message: 'invalid password'}});
      }

      User.findByIdAndUpdate(user.id, { lastLogin: Date.now() }); 

      //use jwt and return it. email and id
      const payload = {
        id: user._id,
        email: user.email
      }

      const token = jwt.sign(payload, secretOrKey, {});
      res.json(token);

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
  }
)

modules.exports = router;

