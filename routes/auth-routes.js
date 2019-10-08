const express = require('express');
const router = express.Router();

router.post('/registration', express.json(), async (req, res) => {
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

router.get('/login', async (req, res) => {
  const auth = req.headers.authorization
  const base64String = auth.split(" ")[1]
  const credentials = Buffer.from(base64String, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const foundUser = await User.findOne({username: username});
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    res.status(401).send('not authenticated!')
  } else {
    const token = jwt.sign({_id: foundUser._id}, process.env.JWT_SECRET);
    res.send(token)
  }
})

module.exports = router;