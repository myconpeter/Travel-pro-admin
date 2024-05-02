const express = require("express");
const router = express.Router();
const passport = require ("passport");
const {ensureAuthenticated} = require('../config/auth');
const Plane = require("../models/createPlaneSchema");

router.get('/createPlane', ensureAuthenticated,  (req,res)=>{
    res.render('flight')
})

router.post('/createPlane', async (req, res) => {

    
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    const randomString = generateRandomString(12);
    let { name, seat, gate, flightNo, time, planeClass, from, to, departure } = req.body;
    let client = randomString

    let errors = [];
    if (!name || !seat || !gate || !flightNo || !time || !planeClass || !from || !to || !departure) {
        errors.push({ msg: "Please fill in all fields" });
    }

    

    if (errors.length > 0) {
        return res.render('flight', {
            errors,
            name,
            seat,
            gate,
            flightNo,
            time,
            planeClass,
            from,
            to,
            departure
        });
    }

  
    


    const newPlaneTicket = new Plane({
        name,
        seat,
        gate,
        flightNo,
        time,
        planeClass,
        from,
        to,
        departure,
        client
    });

    await newPlaneTicket.save();
    req.flash('success_msg', 'You have now added a new plane ticket');
    res.redirect(`/createconfirm/${client}`);
});


router.get('/allFlight', ensureAuthenticated,  async(req,res)=>{
    try {
        const allTickets = await Plane.find();
        res.render('allFlight', { tickets: allTickets });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})


router.get('/delete/:id', async (req, res) => {
    const ticketId = req.params.id;

    try {
        // Find the ticket by its ID and remove it from the database
        await Plane.findByIdAndDelete(ticketId);

        // Redirect back to the page displaying all tickets after deletion
        req.flash('success_msg', 'Deleted successfully.');

        res.redirect('/allFlight');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});







module.exports = router; 