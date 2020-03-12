const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Action = require('../models/Action');
const { registerValidation, loginValidation } = require('../validation');

const TOKEN_SECRET= "fdkaglkdflkglkadgfdkllşdlgdfa";

router.post('/register', async (req, res) => {
    //Validation
    const { error } = registerValidation(req.body);
    if (error) {
        return res.json({
            statusCode: 400,
            message: error.details[0].message
        });
    };

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ username: req.body.username });
    if (emailExist) {
        return res.json({
            statusCode: 400,
            message: "Email already exist!"
        });
    };

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role
    });
    try {
        const savedUser = await user.save();
        res.json({
            statusCode: 201,
            user: savedUser
        });
    } catch (err) {
        res.statusCode(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //Validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.json({
            statusCode: 400,
            message: error.details[0].message
        });
    };

    //Checking if the email exist
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.json({
            statusCode: 400,
            message: "Username is not found!"
        });
    };

    //User found! Compare password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.json({
            statusCode: 400,
            message: "Invalid password"
        })
    }

    //Create and assign a token
    const token = jwt.sign({_id: user._id, role: user.role}, TOKEN_SECRET);

    //Create a new row about signing date
    const newAction = new Action({
        userId: user._id,
        loginDate: Date.now()
    })
    await newAction.save();

    res.header('auth-token', token);
    res.json({
        statusCode: 200,
        user: token
    });
});

router.post('/logout', async (req, res) => {
    //Find last id by userId.
    const id = await Action.find({ userId: req.body.userId }).sort({$natural: -1}).limit(1).then((doc) => {
        console.log(doc)
        return doc[0]._id;
    });

    //Find and update logout date by id.
    await Action.findOneAndUpdate({ _id: id }, {$set:{logoutDate: Date.now()}}, {new:true});
    res.json({
        statusCode: 200
    });
});

router.post('/actions/streams', async (req,res) => {
    //Create a new stream in action collection.
    const item = {
        channelTitle: req.body.channelTitle,
        duration: req.body.duration
    }

    //Find last id by userId.
    const id = await Action.find({ userId: req.body.userId }).sort({$natural: -1}).limit(1).then((doc) => {
        return doc[0]._id;
    });

    //Find and push a new stream by id.
    await Action.findOneAndUpdate({ _id: id }, {$push:{streams: item}}, {new:true});
    res.json({
        statusCode: 200,
        action: item
    });
});

router.get('/actions', (req,res) => {
    //Get all items in action.
    Action.find({}, (err, docs) => {
        if(!err){
            res.json({
                statusCode: 200,
                items: docs 
            });
        }else{
            res.json({
                statusCode: 400,
            });
        }
    })
});

router.get('/users', (req,res) => {
    //Get all items in users.
    User.find({}, (err, docs) => {
        if(!err){
            res.json({
                statusCode: 200,
                items: docs 
            });
        } else {
            res.json({
                statusCode: 400,
            });
        }
    })
});

module.exports = router;