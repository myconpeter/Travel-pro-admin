const express = require("express");
const router = express.Router();
const passport = require ("passport");
const {ensureAuthenticated} = require('../config/auth');
const Plane = require("../models/createPlaneSchema");

router.get('/createconfirm/:client', (req, res) => {
    const { client } = req.params;
   
    res.render('createConfirmed', { client: client });
});






module.exports = router; 