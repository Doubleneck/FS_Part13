const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { User, Session } = require('../models')



router.delete('/',  tokenExtractor , async (req, res) => {
  

  try {
    const user = await User.findByPk(req.decodedToken.id)
    console.log('user:', user.id)
    await Session.destroy({
      where: {
        user_id: user.id
      }
    });
    return res.status(200).json({ message: 'User logout successfully' })
  } catch(error) {
    return res.status(400).json({ error })
  }
})



module.exports = router