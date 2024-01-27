'use strict'

const { v4: uuid } = require('uuid')

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Files', [
      {
        id : uuid(),
        type: 'image/jpeg',
        filename : 'johnaja@MediaList.com',
        path : '/public/images/john.jpg',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },
  
  down : async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Files', null, {})
  }
}