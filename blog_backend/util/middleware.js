const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')


const sessionExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const session = await Session.findOne({
        where: {
          token: authorization.substring(7)
        }
      })
      if (!session) {
        return res.status(401).json({ error: 'not valid session' })
      }
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'not valid session' })
    }
  }
  next()
}


const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        const user = await User.findOne({
          where: {
              id: req.decodedToken.id
          }   
        })
        console.log(user)
        if (user.disabled) {
            return response.status(401).json({
              error: 'user disabled'
            })
          }

      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'SequelizeDatabaseError') {
      return response.status(400).send({ error: error.message });
    }
    if (error.name === 'SequelizeValidationError') {
      return response.status(400).send({ error: error.message });
    }
    next(error);
};
  
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
  
module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor ,
    sessionExtractor
}