const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

exports.signup = async (req, res) => {
    const user = await userModel.findOne({username: req.user.username})

    res.status(200).json({
        message: 'Signup successful',
        user: req.user
    });
}

exports.login = (req, res, { err, user, info}) => {

    if (!user) {
        return res.json({ message: 'Username or password is incorrect'})
    }
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, username: user.username };
            
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

            return res.status(200).json({ token });
        }
    );
}