import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import User from "../models/User";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (accessToken, _refreshToken, profile: GoogleProfile, done) => {
  // Implementation for handling Google authentication
  try{
    let user = await User.findOne({googleId : profile.id});
    if (!user) {
      user = await User.create({
            googleId:    profile.id,
            displayName: profile.displayName,
            email:       profile.emails?.[0].value ?? '',
            avatar:      profile.photos?.[0].value,
          });
    }
    return done(null, user);
  } catch (error) {
    return done(error as Error);
  }
}));