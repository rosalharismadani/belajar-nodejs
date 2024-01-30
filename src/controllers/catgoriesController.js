const {Categories} = require('../models');
const BuildResponse = require('../helpers/BuildResponse');
const { Op } = require('sequelize')

class CategoriesController {
  async getAll(req, res) {
    try{
      const {page, pageSize, title} = req.query;

      const offset= Number((page - 1) * pageSize) || 0;
      const limit = Number(pageSize) || 10;

      let whereParams = {}
      if(title) {
        whereParams = {
          title: {[Op.like]: `%${title}%`}
        };
      }
      
      const categories = await Categories.findAll({
        limit,
        offset,
        where: whereParams,
      })

      const total = await Categories.count({
        where: whereParams
      })

      const buildResponse = BuildResponse.get({count: total, data: categories})
      res.status(200).json(buildResponse)
    } catch(error){
      res.status(500).json(error.message || 'internal server error')
    }  
  }

  async getById(req, res) {
    try {
      const id = req.params.id
      const categories = await Categories.findByPk(id)

      res.status(200).json({
        code: 200,
        message: 'Data sudah diterima',
        data: categories
      })
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async createCategory(req, res){
    const formBody = req.body;
    const { title } = formBody;
    try{
      await Categories.create({
        title: title,
      });

      const categories = await Categories.findAll({
        where: {title: `${title}`}
      })
  
      res.status(201).json({
        code: 201,
        message: 'Data berhasil dibuat',
        data: categories
      })

    }catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async updateCategory(req, res) {
    try{
      const id = req.params.id;
      const formBody = req.body;
      const { title } = formBody;
      
      await Categories.update({
        title: `${title}`,
      }, {
        where: {id: id},
      });

      const categories = await Categories.findByPk(id)

      res.status(200).json({
        code: 200,
        mesage: 'Data berhasil diperbarui',
        data: categories
      })
    } catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async deleteCategory(req, res){
    const idparam = req.params.id

    try{
      await Categories.destroy({
        where: {id: `${idparam}`}
      })

      res.status(200).json({
        code: 200,
        mesage: 'Data berhasil dihapus'
      })
    }catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

}

module.exports = new CategoriesController();