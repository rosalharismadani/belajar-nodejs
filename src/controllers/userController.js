const {Users, Files} = require('../models');
const { Op } = require ('sequelize');
const BuildResponse = require('../helpers/BuildResponse')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../helpers/SendEmail');


class UserController {
  async getAll(req, res)  {
    try {
      const {page, pageSize, fullName} = req.query;

      const offset= Number((page - 1) * pageSize) || 0;
      const limit = Number(pageSize) || 10;


      let whereParams ={}
      if(fullName) {
        whereParams = {
          fullName: {[Op.like]: `%${fullName}%`}
        }
      }
      const users = await Users.findAll({
        limit,
        offset,
        where: whereParams,
        include: {
          model: Files,
        }
      })

      const total = await Users.count({
        where: whereParams
      })

      // sendEmail()

      const buildResponse = BuildResponse.get({ count: total, data: users})
        
      res.status(200).json(buildResponse)
    } catch (error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async getById(req, res) {
    try {
      let id = req.params.id
      const users = await Users.findByPk(id)

      const buildResponse = BuildResponse.get({data: users})

      res.status(200).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
    
  }

  async createUser(req, res) {
    try{
      const formBody = req.body;
      const { fullName, email, confirmPassword, newPassword, role, status} = formBody;
      const password = req.body.newPassword;    
      const saltRounds = 10 ;
      const encryptedPassword = await bcrypt.hash(password, saltRounds)

      if (confirmPassword === newPassword){
        await Users.create({
          fullName: fullName,
          email: email,
          password: encryptedPassword,
          role: role,
          status: status
        })
      }
      
      const users = await Users.findAll({
        where: {fullName: `${fullName}`}
      })

      const buildResponse = BuildResponse.createData({data: users})
      res.status(200).json(buildResponse)

    } catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const formBody = req.body;
    const { fullName, email, confirmPassword, newPassword, role, status} = formBody;

    try{
      if (confirmPassword === newPassword){
        if(newPassword !== ''){
          await Users.update({
            fullName: fullName,
            email: email,
            password: confirmPassword,
            role: role,
            status: status
          }, {
            where: {id: id}
          })
        } else {
          await Users.update({
            fullName: fullName,
            email: email,
            role: role,
            status: status
          }, {
            where: {id: id}
          })
        }
        
        const users = await Users.findAll({
          where: {id: id}
        })

        const buildResponse = BuildResponse.updateData({data: users})
        res.status(200).json(buildResponse)
      } else {
        res.status(500).json({
          message: 'Password baru dengan konfirmasi password berbeda'
        })
      }


    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async deleteUser(req, res) {
    const idparam = req.params.id;

    try{
      await Users.destroy({
        where: {id: idparam}
      })

      const buildResponse = BuildResponse.deleteData();
      res.status(200).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }
  
}

module.exports = new UserController();