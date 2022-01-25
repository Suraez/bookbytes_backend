const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/logout', (req, res) => {
    res.send('Logging out....')
})

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}))

// after user select their account while trying to login
router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    console.log('from the  router');
    res.send('yay ! you are logged in  !')
})

module.exports = router;