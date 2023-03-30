const express = require('express');
const adRouter = require('./routes/adRoutes');
const userRouter = require('./routes/userRoutes');

const cors = require('cors');
const { errorResponse } = require('./utils/apiResponse');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/ads', adRouter);
app.use('/api/v1/users', userRouter);

app.use(errorResponse);

module.exports = app;
