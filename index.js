const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { db, dbOptions, dbConnection } = require('./utils/database-utils');

// models
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(db, dbOptions, dbConnection);

app.post('/registration', express.json(), async (req, res) => {
  try {
    const { username, password } = req.body
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hash
    })
    const savedUser = await newUser.save();
    res.send(savedUser)
  } catch(err) {
    res.status(500).send(err)
  }
})

app.get('/login', async (req, res) => {
  const auth = req.headers.authorization
  const base64String = auth.split(" ")[1]
  const credentials = Buffer.from(base64String, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const foundUser = await User.findOne({username: username});
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    res.status(401).send('not authenticated!')
  } else {
    res.send('all good 🍪')
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))