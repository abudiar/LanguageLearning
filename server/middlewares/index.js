const {User, Class}        = require('../models');

const jwt     = require('jsonwebtoken');
const secret  = 'secret'

function decodeToken (token) {
  return jwt.verify(token, secret, {
    expiresIn: '1h'
  })
}

class Middleware {
  static authenticate(req, res, next) {
    console.log(req.headers, 'headers')
    const accessToken = req.headers.accesstoken;
    console.log(accessToken, 'token pribe')
    if (!accessToken) {
      throw new Error('You have to login');
    }

    if (decodeToken(accessToken)) {
      req.user = decodeToken(accessToken);
      User.findOne({ where: {id: req.user.id}})
        .then(user => {
          if (!user) {
            throw new Error('User not found');
          }
          next();
        })
    }
  }

  static authorized(req, res, next) {
    const UserId = req.user.sub;
    if (req.params.id) {
      Class.findByPk(req.params.id)
        .then(lang => {
          if (!lang) {
            throw new Error('Class not found');
          }
          if (lang.UserId != UserId) {
            throw new Error('You are not authorized');
          }
          next();
        })
        .catch(err => {
          console.log(err)
          next(err)
        });
    } else {
      Class.findAll({where: {UserId}})
        .then(lang => {
          if (!lang.length) {
            res.status(200).json({message: 'You dont have class'});
          }
          next();
        })
        .catch(err => {
          console.log(err)
          next(err)
        });
    }
  }

  static errorHandler(err, req, res, next) {
    console.log(err, 'IKI MESSAGE');
    console.log(err.message, 'IKI MESSAGE');
    if (err.name == 'SequelizeValidationError') {
      return res.status(400).json(err);
    } 

    if (err.name == 'JsonWebTokenError' || err.message == 'You are not authorized') {
      console.log('masuk sini')
      if (!err.message) {
        err.message = 'Invalid token, please relogin'
      }
      return res.status(401).json({error: err.message});
    }
    
    if (err.message === ('Todo not found' || 'User not found')) {
      return res.status(404).json({error: err.message});
    } 
    
    if (typeof err.message === 'string') {
      return res.status(400).json({error: err.message});
    }
    
    console.log('masuk 5000');
    return res.status(500).json(err);
  }
}

module.exports = Middleware;