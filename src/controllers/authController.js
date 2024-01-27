const {Users} = require('../models');
const BuildResponse = require('../helpers/BuildResponse')
const jwt = require('jsonwebtoken')

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //cek apakah user tersedia dan statusnya aktif
      const user = await Users.findOne({ where : {email}, raw: true })
      console.log('user',user)

      if(!user) {
        throw new Error('User tidak ditemukan')
      }
    
      res.status(200).json({})  
    } catch (error){
      res.status(500).json(error.messages || 'internal server error')
    }
  }
}

module.exports = new AuthController();