const { DataTypes } = require('sequelize')
module.exports = {
  up: async ({ context: queryInterface }) => {
 
    await queryInterface.addColumn('user_blogs', 'unread', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    })

  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}