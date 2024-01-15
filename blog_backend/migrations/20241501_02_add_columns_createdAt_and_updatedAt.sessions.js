const { DataTypes } = require('sequelize')
module.exports = {
  up: async ({ context: queryInterface }) => {
 
    await queryInterface.addColumn('sessions', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
    })

    await queryInterface.addColumn('sessions', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
    })

  },

  down: async (queryInterface ) => {

    await queryInterface.removeColumn('sessions', 'created_at')
    await queryInterface.removeColumn('sessions', 'updated_at')
  }
}