const userRouter = require('express').Router();

const {
  userSignup,
  userSignin,
  userSignout,
  checkUser,
} = require('../controllers/userController')

userRouter.route('/signup')
  .post(userSignup)

userRouter.route('/signin')
  .post(userSignin)

userRouter.route('/signout')
  .get(userSignout)

userRouter.route('/checkAuth')
  .get(checkUser)

module.exports = userRouter