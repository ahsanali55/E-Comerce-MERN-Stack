import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import User from "../models/User";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (_accessToken, _refreshToken, profile: GoogleProfile, done) => {
  // Implementation for handling Google authentication
  try {
    const email = profile.emails?.[0].value!;
    let user = await User.findOne(email ? { email } : { googleId: profile.id });
    if (user) {
      // Update user with Google ID if not already set
      if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
      }
    } else {
      user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email,
        avatar: profile.photos?.[0].value,
      });

    }
    return done(null, user);
  } catch (error) {
    return done(error as Error);
  }
}));

passport.use(new FacebookStrategy({
  clientID:          process.env.FACEBOOK_APP_ID!,
  clientSecret:      process.env.FACEBOOK_APP_SECRET!,
  callbackURL:       '/auth/facebook/callback',
  profileFields:     ['id', 'emails', 'name', 'picture'],
}, async (_accessToken, _refreshToken, profile: FacebookProfile, done) => {
  try {
    const email = profile.emails?.[0].value!;
    let user = await User.findOne({ email });

    if (user) {
      if (!user.facebookId) { user.facebookId = profile.id; await user.save(); }
    } else {
      user = await User.create({
        facebookId: profile.id,
        email,
        displayName:   `${profile.name?.givenName} ${profile.name?.familyName}`,
        avatar: profile.photos?.[0].value,
      });
    }
    done(null, user);
  } catch (err) {
    done(err as Error);
  }
}));