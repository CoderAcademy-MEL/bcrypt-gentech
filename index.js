const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { db, dbOptions, dbConnection } = require('./utils/database-utils');

// models
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(db, dbOptions, dbConnection);

app.use(require('./routes/auth-routes'))
app.use('/protected', require('./routes/protected-routes'))

app.listen(PORT, () => console.log(`listening on port ${PORT}`))