const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('598465550580-euke67e8kff737p7rjqa63hf1mk7blsg.apps.googleusercontent.com')
const { login, register } = require('../helper/sendEmail')

class UserController {

    static register(req, res) {
        const { full_name, email, password } = req.body
        console.log(full_name, email, password);
        let option = { where: { email } }
        User.findOne(option)
            .then(data => {
                if (data) {
                    console.log('ada');
                    res.status(400).json({
                        message: 'user already exist'
                    })
                } else {
                    register(email)
                    return User.create({ full_name, email, password })
                }
            })
            .then(user => {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'secret')
                res.status(201).json({ accessToken })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        let option = { where: { email } }
        User.findOne(option)
            .then(data => {
                if (!data) {
                    res.status(400).json({
                        message: 'email tidak terdaftar'
                    })
                } else {
                    const isPasswordValid = compare(password, data.password)
                    if (!isPasswordValid) {
                        res.status(400).json({
                            message: 'password salah'
                        })
                    } else {
                        login(email)
                        const accessToken = jwt.sign({
                            id: data.id,
                            email: data.email
                        }, 'secret')
                        res.status(201).json({ accessToken })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static googleLogin(req, res) {
        let user = {}
        const token = req.body.token
        // console.log(token);
        client.verifyIdToken({
            idToken: token,
            audience: '598465550580-euke67e8kff737p7rjqa63hf1mk7blsg.apps.googleusercontent.com'
        })
            .then(googleData => {
                // console.log(googleData);
                const payload = googleData.getPayload()
                // console.log(payload);
                user.email = payload.email
                user.password = 'password'
                user.full_name = payload.name
                let option = { where: { email: user.email } }
                return User.findOne(option)
            })
            .then(userData => {
                if (userData) {
                    login(user.email)
                    return userData
                } else {
                    // console.log(userData);
                    register(user.email)
                    return User.create(user)
                }
            })
            .then(user => {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'secret')
                res.status(201).json({ accessToken })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = UserController