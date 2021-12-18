import User from '../models/user';
import { hashPassword, ComparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';

// register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6)
      return res
        .status(400)
        .send('Password is required and should be min 6 character long');
    if (!email) return res.status(400).send('Email is required');
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is already Taken');

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Register the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('saved user', user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).send('Error, Try Again');
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    // check if we have user with the given email
    if (!user) return res.status(400).send('No User Found!');
    // if true then check the password
    const match = await ComparePassword(password, user.password);
    // create JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // send json res back with cookie, and exclued the password
    user.password = undefined;
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true,
    });
    // send json res (user)
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error, Try Again');
  }
};
