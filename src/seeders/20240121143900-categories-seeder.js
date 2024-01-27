'use strict'

const { v4: uuid } = require('uuid')

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        id : uuid(),
        title: 'Teknologi',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },
  
  down : async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}