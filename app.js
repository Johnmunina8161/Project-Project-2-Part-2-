require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Passport config
require('./config/passport');

const app = express();

/* ===================
    MIDDLEWARE
===================== */
app.use(express.json());

app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =====================
    ROUTES
===================== */
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes.router);

app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));

// Swagger UI - Disponible sur /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ====================
    ROOT REDIRECT
    C'est ici que la magie opère : en tapant l'URL de base, 
    l'utilisateur est envoyé vers Swagger.
===================== */
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

/* =====================
    DATABASE + SERVER
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));