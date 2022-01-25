const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    res.json({
        success: true,
        msg: 'successfully log out'
    })
})

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}))

// after user select their account while trying to login
router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    if (req.user){
        res.redirect('/auth/profile')
    } else {
        res.redirect('/auth/fail')
    }
})

// after successful authentication
router.get('/profile', (req, res) => {
    res.json({
        success: true,
        data: req.user
    })
})

// after invalid authentication
router.get('/fail', (req, res) => {
    res.json({
        success: false,
        msg: 'can not log in the user'
    })
})

const authCheck = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/fail')
    }
}


// defining a protected route
router.get('/getprofile', authCheck, (req, res) => {
    res.send('You are able to access this page');
})
module.exports = router;