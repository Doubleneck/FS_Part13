const router = require('express').Router()
var validator = require('validator')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

const emailValidator = async (req, res, next) => {
    const { username } = req.body;
    if (validator.isEmail(username)) {
      next();
    } else {
      res.status(400).json({ error: 'Invalid email address' });
    }
  };

router.post('/', emailValidator, async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const userFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id)
    next()
} 

router.get('/:id', userFinder, async (req, res) => {
  if (req.user) {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
        })
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', userFinder, async (req, res) => {
    if (req.user) {
      const user = await req.user.update(req.body)
      res.json(user)
    } else {
      res.status(404).end()
    }
})

module.exports = router