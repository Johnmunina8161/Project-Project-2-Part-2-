const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Serialize only the minimal user info
passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL

    },
    (accessToken, refreshToken, profile, done) => {
      // Optional: save user to DB here if needed
      return done(null, profile);
    }
  )
);

module.exports = passport;
