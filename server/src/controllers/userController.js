const bcrypt = require('bcrypt');
const User = require('../db/user.model.js')

const saltRound = 10

const userSignup = async (req, res) => {
  const { email, password: plainPass, userName } = req.body
  if (email && plainPass && userName) {
    const password = await bcrypt.hash(plainPass, saltRound)
    const newUser = await User.create({
      email,
      password,
      userName,
    })

    req.session.user = {
      id: newUser._id,
      name: newUser.userName,
    }

    return res.sendStatus(200);
  }
  return res.sendStatus(418);
}

const userSignin = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    const currentUser = await User.findOne({ email })
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.user = {
        id: currentUser._id,
        name: currentUser.userName
      }

      return res.json({name: currentUser.userName});
    }
    return res.sendStatus(418);
  }
  return res.sendStatus(418);
}

const userSignout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);

    res.clearCookie(req.app.get('cookieName'))
    return res.sendStatus(200);
  })
}

const checkUser = (req, res) => (req.session?.user?.id ? res.json({name: req.session.user.name}) : res.sendStatus(401))

module.exports = {
  userSignup,
  userSignin,
  userSignout,
  checkUser,
}

