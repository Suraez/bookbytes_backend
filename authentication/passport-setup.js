const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

// IF ANY CONFUSION WATCH "THE NET NINJA" passport.js oauth VIDEOS

// stroring id in cookie of the browser for further login
// this is called by line 36 and 47
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// retreiving user info after browser sends user id in cookie
// this is called after passport serializeUser is called

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
})

passport.use(
    new GoogleStrategy({
            // options for google Strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        //callback placeholder

        // if any confusion watch net ninja tuts conatining 21 videos
        console.log('from the callback');
        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if (currentUser) {
                    //user already exists
                    console.log("user already exists", currentUser);
                    // calling above function passport serializeuser
                    done(null, currentUser);
                } else {
                    const newUser = new User({
                        name: profile.displayName,
                        googleId: profile.id
                    })
            
                    newUser.save()
                        .then(res => {
                            console.log('user saved to the database');
                             // calling above function passport serializeuser
                            done(null, res);
                        })
                        .catch(err => console.log('Oops! some error occured while saving user'))
                }
            })

    })
)