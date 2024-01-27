'use strict'

const { v4: uuid } = require('uuid')

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id : uuid(),
        fullName: 'John Doe',
        email : 'johnaja@MediaList.com',
        role : 'Super Admin',
        password : 'johnaja1234',
        status : 'Active',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        id : uuid(),
        fullName: 'Jane Doe',
        email : 'janeaja@MediaList.com',
        role : 'Creator',
        password : 'janeaja1234',
        status : 'Suspend',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ])
  },
  
  down : async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}