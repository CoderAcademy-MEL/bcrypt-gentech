const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const { db, dbOptions, dbConnection } = require('./utils/database-utils');

// models
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(db, dbOptions, dbConnection);

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}))
app.use(require('./routes/auth-routes'))
app.use('/protected', require('./routes/protected-routes'))
app.use(morgan('dev'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))