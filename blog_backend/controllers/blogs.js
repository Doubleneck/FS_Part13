const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['name']
        }
      })
    res.json(blogs)
  })
  
router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog= await Blog.create({...req.body, userId: user.id, date: new Date()})
  res.json(blog)
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  } 

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const blog = await Blog.findByPk(req.params.id, {
        include: {
            model: User,
            attributes: ['name']
        }
        })
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const blog = await req.blog.update(req.body)
    res.json(blog)
  } else {
    res.status(404).end()
  }
})
  
router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {  
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.blog) {
    await req.blog.destroy()
  } 
  res.status(204).end()
})

module.exports = router
