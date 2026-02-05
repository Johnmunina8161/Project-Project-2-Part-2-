const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login → redirect to Swagger UI
    res.redirect('/api-docs');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
