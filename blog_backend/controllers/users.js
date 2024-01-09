const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
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

router.get('/:id', userFinder, async (req, res) => {//onst user = await User.findByPk(req.params.id)
  if (req.user) {
    res.json(req.user)
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