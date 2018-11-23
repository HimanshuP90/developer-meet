const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//Load User model
const User = require('../../models/User');

//Load input validation
const validateRegisterinput = require('../../validation/register');


//@route GET  api/users/register
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));

//@route POSt  api/users/register
//@desc  Register user
//@access public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterinput(req.body);

    // Check Validation
    if(!isValid) {
        res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//@route GET  api/users/login
//@desc  Login user
//@access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            //check for user
            if(!user) {
                return res.status(404).json({ email: 'User not found'})
            }

            //check  password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User matched

                         const payload = {id: user.id, name: user.name, avatar: user.avatar} //payload got jwt
                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrkey,
                            { expiresIn: 3600 }, (err, token) => {
                                res.json({ 
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                        });

                    } else {
                        return res.status(400).json({ password: 'Password incorrect'})
                    }
                })
        })
});

//@route GET  api/users/current
//@desc  Return current user
//@access public

router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
)

module.exports = router;