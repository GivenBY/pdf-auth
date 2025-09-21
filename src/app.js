const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(session({
  secret: 'pdf_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24*60*60*1000 }
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
