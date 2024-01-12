const router = require('express').Router()
const { UserBlogs } = require('../models')



router.post('/',  async (req, res) => {
  console.log(typeof(req.body.user_id))
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

module.exports = router