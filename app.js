// app.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./db'); // 🧠 pake modul koneksi
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

connectDB(); // 🔌 panggil koneksi

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server nyala di port ${PORT}`));
