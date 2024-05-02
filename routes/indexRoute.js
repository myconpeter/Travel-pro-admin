const express = require("express");
const router = express.Router();
const passport = require ("passport");
const {ensureAuthenticated} = require('../config/auth');


router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('index')
});

router.get('/login', (req, res)=>{
    res.render('login')
});




//
//
router.post('/login', (req, res, next)=>{
    passport.authenticate('userAdmin',{
        successRedirect : '/',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res,next)
    });

    router.get('/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'An error occurred while logging out');
            } else {
                req.flash('success_msg', 'You have successfully logged out');
            }
            res.redirect('/');
        });
    });
    
    
    
module.exports = router; 