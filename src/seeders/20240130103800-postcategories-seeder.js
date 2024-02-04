'use strict'

const { v4: uuid } = require('uuid')

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PostCategories', [
      {
        id : uuid(),
        postId: '89aa078f-5d9e-40f5-8593-2442940ad451',
        categoryId : 'ecde03f4-e0ca-450b-8c4f-358e29d72b12',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },
  
  down : async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PostCategories', null, {})
  }
}