const express = require("express");
const router = express.Router();
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');

const {ensureAuthenticated} = require('../config/auth'); 

router.get('/admincreate',   (req, res)=>{
    res.render('adminCreate');
});

router.post('/admincreate', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    let errors = [];
    if (!email || !password) {
        errors.push({ msg: "Please fill in all fields" });
    }
    if (errors.length > 0) {
        return res.render('admincreate', {
            errors,
            email,
            password,
        });
    }
    try {
        const foundEmail = await Admin.findOne({ email });
        if (foundEmail) {
            errors.push({ msg: 'Admin email already registered' });
            return res.render('admincreate', {
                errors,
                email,
                password,
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdmin = new Admin({
                email,
                password: hashedPassword,
            });

            await newAdmin.save();
            req.flash('success_msg', 'You have now registered as an Admin. Please log in.');
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router; 