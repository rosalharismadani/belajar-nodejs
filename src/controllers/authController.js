const {Users} = require('../models');
const BuildResponse = require('../helpers/BuildResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let token, secretKey, options;

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //cek apakah user tersedia dan statusnya aktif
      const user = await Users.findOne({ where: { email }, raw: true })
      

      if(!user) {
        throw new Error('data tidak ditemukan')
      } else if(user.status !== 'Active') {
        throw new Error('User ditangguhkan, silahkan hubungi administrator untuk informasi lebih lanjut')
      }

      const match = await bcrypt.compare(password, user.password)

      if(!match) {
        throw new Error('Email atau Password salah')
      }

      const payload = {
        id: user.id,
        role: user.role
      }

      if(user.role == 'Super Admin'){
        secretKey = 'qawsedrft';
        options ={ expiresIn: '5min' }
        token = jwt.sign(payload, secretKey, options);
      } else if(user.role == 'Creator') {
        secretKey = 'lmknjbhvg';
        options ={ expiresIn: '5min' }
        token = jwt.sign(payload, secretKey, options);
      }

      delete user.password;
      
      const buildResponse = BuildResponse.get({
        accesToken: token,
        expiresIn: 60000,
        tokenType: 'Bearer',
        user

      })
    
      res.status(200).json(buildResponse)
    } catch (error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async profil(req, res){
    try{
      const { email } = req.body;

      const user = await Users.findOne({where: {email}})

      user.password = undefined;

      const buildResponse = BuildResponse.get({data: user})

      res.status(200).json(buildResponse)
    }catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }
}

module.exports = new AuthController();