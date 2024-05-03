const express = require("express");
const router = express.Router();
const passport = require ("passport");
const {ensureAuthenticated} = require('../config/auth');
const Ship = require("../models/createShipSchema");

router.get('/createShip', ensureAuthenticated,  (req,res)=>{
    res.render('ship')
})

router.post('/createShip', async (req, res) => {

    
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    const randomString = generateRandomString(16);
    let { name, orderNumber, gate, shipmentNo, time, shipmentType, from, to, departure } = req.body;
    let client = randomString

    let errors = [];
    if (!name || !orderNumber || !gate || !shipmentNo || !time || !shipmentType || !from || !to || !departure) {
        errors.push({ msg: "Please fill in all fields" });
    }

    

    if (errors.length > 0) {
        return res.render('ship', {
            errors,
            name,
            orderNumber,
            gate,
            shipmentNo,
            time,
            shipmentType,
            from,
            to,
            departure
        });
    }

  
    


    const newShipTicket = new Ship({
        name,
        orderNumber,
        gate,
        shipmentNo,
        time,
        shipmentType,
        from,
        to,
        departure,
        client
    });

    await newShipTicket.save();
    req.flash('success_msg', 'You have now added a new ship ticket');
    res.redirect(`/createconfirm/${client}`);
});


router.get('/allShip', ensureAuthenticated,  async(req,res)=>{
    try {
        const allTickets = await Ship.find();
        res.render('allShip', { tickets: allTickets });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})


router.get('/deleteShip/:id', async (req, res) => {
    const ticketId = req.params.id;

    try {
        // Find the ticket by its ID and remove it from the database
        await Ship.findByIdAndDelete(ticketId);

        // Redirect back to the page displaying all tickets after deletion
        req.flash('success_msg', 'Deleted successfully.');

        res.redirect('/allShip');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});







module.exports = router; 