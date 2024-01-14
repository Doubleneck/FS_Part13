const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { UserBlogs } = require('../models')



router.post('/',  async (req, res) => {
  try {
    await UserBlogs.create({
      userId: req.body.user_id,
      blogId: req.body.blog_id
    })
    return res.status(200).json({ message: 'UserBlog created successfully' })
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const userBlog = await UserBlogs.findByPk(req.params.id)

  if ( userBlog.userId!== req.decodedToken.id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  console.log('UserBlog before update:', userBlog.toJSON());
  try {
    await userBlog.update({ unread: false })
    console.log('UserBlog after update:', userBlog.toJSON());
    return res.status(200).json({ message: 'UserBlog updated successfully' })
  } catch(error) {
    return res.status(400).json({ error })
  }
}
)

module.exports = router