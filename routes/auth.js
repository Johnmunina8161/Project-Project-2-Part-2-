const express = require('express');
const passport = require('passport');
const router = express.Router();

// Middleware to protect routes
function ensureAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Start GitHub login
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // ✅ AFTER GitHub login → Swagger UI
    res.redirect('/api-docs');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = { router, ensureAuth };

