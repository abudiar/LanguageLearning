const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client_id = require('../config/config.json').google.client_id
const client = new OAuth2Client(client_id)
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
                }, 'secret')
                res.status(201).json({ accessToken, name: user.full_name })
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        console.log(req.body)
        let option = { where: { email } }
        User.findOne(option)
            .then(data => {
                console.log('masuk user find')
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
                        }, 'secret')
                        res.status(201).json({ accessToken, name: data.full_name })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static googleLogin(req, res) {
        let user = {}, existuser
        const token = req.body.id_token
        console.log(req.body, 'masuk');
        client.verifyIdToken({
            idToken: token,
            audience: client_id
        })
            .then(googleData => {
                console.log(googleData);
                existuser = googleData.payload
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
                    if(userData.full_name === existuser.name) {
                        return userData
                    } else {
                        throw new Error('Email address already taken')
                    }
                } else {
                    // console.log(userData);
                    register(user.email)
                    return User.create(user)
                }
            })
            .then(user => {
                console.log(user, 'user founded')
                const accessToken = jwt.sign({
                    id: user.id
                }, 'secret')
                res.status(201).json({ accessToken, name: user.full_name })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }

}

module.exports = UserController