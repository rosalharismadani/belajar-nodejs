const {Users, Files} = require('../models')

class UserController {
  async getAll(req, res)  {
    try {
      const {page, pageSize, fullName} = req.query;

      let whereParams ={}
      if(fullName) {
        whereParams = fullname;
      }
      const users = await Users.findAll({
        limit: Number(pageSize),
        offset: Number((page - 1) * pageSize),
        where: whereParams,
        include: {
          model: Files
        }
      })

      const total = await Users.count({
        where: whereParams
      })
        
      res.status(200).json({
        code: 200,
        messages: `${users.length} data sudah diterima`,
        count: total,
        data: users
      })
    } catch (error){
      res.status(500).json(error.messages || 'internal server error')
    }
  }

  async getById(req, res) {
    try {
      let id = req.params.id
      const users = await Users.findByPk(id)

      res.status(200).json({
        code: 200,
        message: 'Data sudah diterima',
        data: users
      })
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
    
  }
  
}

module.exports = new UserController();