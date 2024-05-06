const express = require("express");
const router = express.Router();
const passport = require ("passport");
const {ensureAuthenticated} = require('../config/auth');
const Ship = require("../models/createShipSchema");

router.get('/createShip', ensureAuthenticated,  (req,res)=>{
    res.render('ship')
})

router.post('/createShip', ensureAuthenticated, async (req, res) => {

    
    function generateRandomString(length) {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    // Generate random string of twelve numbers
    const randomString = generateRandomString(12);
    let { name, orderNumber, gate, shipmentNo, time, shipmentType, from, currentLocation, to, departure, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10 } = req.body;
    let client = randomString

    let errors = [];
    if (!name || !orderNumber || !gate || !shipmentNo || !time || !currentLocation || !shipmentType || !from || !to || !departure) {
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
            currentLocation,
            to,
            departure,
            item1,
            item2, 
            item3,
            item4,
            item5, 
            item6, 
            item7, 
            item8, 
            item9, 
            item10       
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
        currentLocation,
        to,
        departure,
        client,
        item1,
        item2, 
        item3,
        item4,
        item5, 
        item6, 
        item7, 
        item8, 
        item9, 
        item10

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


router.get('/editShip/:id', ensureAuthenticated, async(req,res)=>{
    // find through the req.params 
    const ticket = await Ship.findById(req.params.id);
    if(!ticket){
        res.send('error, cannot get item')
    }
    res.render('editShipForm', { ticket });

})

// edit ship route


router.post('/editedShip/:id', ensureAuthenticated, async(req, res)=>{
    const {id} = req.params
    const realItem = await Ship.findById(id)
    const {
        name,
        orderNumber,
        gate,
        shipmentNo,
        time,
        shipmentType,
        from,
        currentLocation,
        to,
        departure,
        client,
        item1,
        item2, 
        item3,
        item4,
        item5, 
        item6, 
        item7, 
        item8, 
        item9, 
        item10

    } = req.body

    if(!realItem){
        res.send('error, cannot get item')
    }
  const editShip = await Ship.findByIdAndUpdate(id, {
        name,
        orderNumber,
        gate,
        shipmentNo,
        time,
        shipmentType,
        from,
        currentLocation,
        to,
        departure,
        client,
        item1,
        item2, 
        item3,
        item4,
        item5, 
        item6, 
        item7, 
        item8, 
        item9, 
        item10
  })

  if(!editShip){
    return res.send('error')
  }

  req.flash('success_msg','You have successfully update ' + name);
  res.redirect('/');

})


router.get('/deleteShip/:id', ensureAuthenticated, async (req, res) => {
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