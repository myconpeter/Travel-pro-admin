// const Admin = require('../models/adminSchema');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const passport = require('passport');

//  passport.use ('userAdmin', new LocalStrategy
//             ({usernameField: 'email'},(email,password,done)=>{
//                 console.log(email, password)
//             //match user
//             Admin.findOne({email:email})
//             .then((user)=>{
//                 if(!user){
//                     return done(null,false,{message:' This admin - email not registered'});
//                 }
//                 //math passwords
//                 bcrypt.compare(password,user.password,(err,isMatch)=>{
//                     if(err) throw err;
//                     if(isMatch){
//                       return done(user);
//                       } else{
//                         return done(null,false,{message: 'Incorrect Password!!!'});
//                     }
//                 })

                
//             })
//             .catch((err)=>{console.log(err)})
//         })
//     )
//     passport.serializeUser(function(user,done) {
//         done(null,user.id);
//     })
//     passport.deserializeUser(function(id,done){
//         Admin.findById(id,function(err,user){
//             done(err,user);
//         })
//     });


const Admin = require('../models/adminSchema');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.use ('userAdmin', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'This admin email is not registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password!!!' });
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Admin.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
