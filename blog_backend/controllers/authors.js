const router = require('express').Router()
var validator = require('validator')
const sequelize = require('sequelize')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    
  const users = await Blog.findAll({
    group: 'author' ,
    attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs:'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes:'],
      ]
  })
  res.json(users)
})

module.exports = router