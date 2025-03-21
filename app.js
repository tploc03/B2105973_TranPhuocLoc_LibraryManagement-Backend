// app.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
connectDB();

const nhaxuatbanRoutes = require('./routes/nhaxuatbanRoutes');
const sachRoutes = require('./routes/sachRoutes');
const theodoimuonsachRoutes = require('./routes/theodoimuonsachRoutes');
const docgiaRoutes = require('./routes/docgiaRoutes');
const nhanvienRoutes = require('./routes/nhanvienRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes công khai
app.use('/api/auth', authRoutes);

// Routes quản lý (yêu cầu admin)
app.use('/api/nhaxuatbans', authMiddleware.verifyToken, authMiddleware.isAdmin, nhaxuatbanRoutes);
app.use('/api/sachs', authMiddleware.verifyToken, sachRoutes); // Người dùng có thể xem
app.use('/api/theodoimuonsachs', authMiddleware.verifyToken, theodoimuonsachRoutes);
app.use('/api/docgias', authMiddleware.verifyToken, authMiddleware.isAdmin, docgiaRoutes);
app.use('/api/nhanviens', authMiddleware.verifyToken, authMiddleware.isAdmin, nhanvienRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});