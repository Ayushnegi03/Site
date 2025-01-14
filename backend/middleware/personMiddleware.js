
const { body, validationResult } = require('express-validator');

// Validation rules
const validatePersonalInfo = [
  body('Name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    //.isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('Contact')
  
    .notEmpty()
    //.withMessage('Contact number is required')
    //.matches(/^\d{10}$/)
    //.withMessage('Contact number must be a valid 10-digit number')
    ,
  body('Email')
    .notEmpty()
    .withMessage('Email is required')
    //.isEmail()
    .withMessage('Must be a valid email address'),
  body('Address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    //.isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters long')
  ,

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
   // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
     
    }
    next();
  },
];

module.exports = validatePersonalInfo;
