const { DataTypes } = require('sequelize')
module.exports = {
  up: async ({ context: queryInterface }) => {
 
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })

  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}