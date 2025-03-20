// app.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// Kết nối tới MongoDB
connectDB();

// Routes
const nhaxuatbanRoutes = require('./routes/nhaxuatbanRoutes');
const sachRoutes = require('./routes/sachRoutes');
const theodoimuonsachRoutes = require('./routes/theodoimuonsachRoutes');
const docgiaRoutes = require('./routes/docgiaRoutes');
const nhanvienRoutes = require('./routes/nhanvienRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/nhaxuatbans', nhaxuatbanRoutes);
app.use('/api/sachs', sachRoutes);
app.use('/api/theodoimuonsachs', theodoimuonsachRoutes);
app.use('/api/docgias', docgiaRoutes);
app.use('/api/nhanviens', nhanvienRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler (đặt sau tất cả các route)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
