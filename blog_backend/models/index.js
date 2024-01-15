const Blog = require('./blog')
const User = require('./user')
const UserBlogs= require('./user_blogs')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)


User.belongsToMany(Blog, { through: UserBlogs, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'usersMarked' })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  UserBlogs,
  Session
}