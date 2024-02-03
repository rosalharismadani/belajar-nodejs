'use strict'

const { v4: uuid } = require('uuid')

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        id : uuid(),
        title: 'Berita Satu',
        description : 'deskripsi',
        status : 'Draft',
        slug : 'test-blog',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },
  
  down : async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {})
  }
}