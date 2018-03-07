const express = require('express');
const router = express.Router();

// requiring model
const userModel = require('../models/schema');

// requiring bcrypt
const bcrypt = require('bcrypt');

// define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })
// define the about route
router.post('/register', function (req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in your password DB.\
        let value = {
            username : req.body.username,
            email : req.body.email,
            password : hash
        };
        userModel.create(value, (err, result) => {
            if(err) return res.json('err')
            else return res.json('saved')
        })
      });
});

router.post('/register', function (req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in your password DB.\
        let value = {
            username : req.body.username,
            email : req.body.email,
            password : hash
        };
        userModel.create(value, (err, result) => {
            if(err) return res.json('err')
            else return res.json('saved')
        })
      });
});

router.post('/login', function (req, res) {
    let value = {
        email : req.body.email
    };
    userModel.findOne(value, (err, result) => {
        if(err) {
            return res.json(err)
        }
        else {
            bcrypt.compare(req.body.password, result.password, function(err, results) {
                // res == true
            if(err) return res.json(err)            
            else{
                return res.json({results : result})
            }
            });
        }
    })
 });

module.exports = router