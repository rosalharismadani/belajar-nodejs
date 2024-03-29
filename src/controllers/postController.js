const {Posts, Files, Categories, PostCategories} = require('../models');
const { Op } = require ('sequelize');
const BuildResponse = require('../helpers/BuildResponse')
const slug = require('slug');
const { raw } = require('body-parser');


class PostController {
  async getAll(req, res)  {
    try {
      const {page, pageSize, title, category} = req.query;

      const offset= Number((page - 1) * pageSize) || 0;
      const limit = Number(pageSize) || 10;


      let whereParamsTitle ={}
      if(title) {
        whereParamsTitle = {
            title: {[Op.like]: `%${title}%` }
        }
      }

      let whereParamsCategory ={}
      if(category) {
        whereParamsCategory = {
            title: {[Op.like]: `%${category}%` }
        }
      }      
      
      const posts = await Posts.findAll({
        limit,
        offset,
        where: whereParamsTitle,
        include: {
          model: Files,
          model: Categories,
          where: whereParamsCategory,
        },
      })

      const total = await Posts.count({
        where: whereParamsTitle
      })

      const buildResponse = BuildResponse.get({ count: total, data: posts})
        
      res.status(200).json(buildResponse)
    } catch (error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async getById(req, res) {
    try {
      let id = req.params.id
      const posts = await Posts.findOne({
        where: {id: id},
        include: {
          model: Categories,
        },
      })

      const buildResponse = BuildResponse.get({data: posts})

      res.status(200).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
    
  }

  async getBySlug(req, res) {
    try {
      let slugparam = req.params.slug
      const posts = await Posts.findOne({
        where: {slug: slugparam},
        include: {
          model: Files,
          model: Categories
        }
      })

      const buildResponse = BuildResponse.get({data: posts})

      res.status(200).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
    
  }

  async createPost(req, res) {
    try{
      const formBody = req.body;
      const { title, description, categoryId, status} = formBody;
      const slugparam = slug(`${title}`)

        await Posts.create({
          title: title,
          description: description,
          status: status,
          slug: slugparam,
        })
      
      const post = await Posts.findOne({ where: {title: `${title}`} })

      await PostCategories.create({
        postId: post.id,
        categoryId: categoryId,
      })

      const buildResponse = BuildResponse.createData({data: post})
      res.status(200).json(buildResponse)

    } catch(error){
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async updatePost(req, res) {
    const id = req.params.id;
    const formBody = req.body;
    const { title, description, categoryId, status} = formBody;
    const slugparam = slug(`${title}`)

    try{
          await Posts.update({
            title: title,
            description: description,
            status: status,
            slug: slugparam
          }, {
            where: {id: id}
          })
        
        const post = await Posts.findOne({
          where: {id: id}
        })

        console.log(post.id)

        await PostCategories.update({
          postId: post.id,
          categoryId: categoryId,
        },{
          where: {postId: post.id}
        })

        const buildResponse = BuildResponse.updateData({data: post})
        res.status(200).json(buildResponse)

    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }

  async deletePost(req, res) {
    const idparam = req.params.id;

    try{
      await Posts.destroy({
        where: {id: idparam}
      })

      const buildResponse = BuildResponse.deleteData();
      res.status(200).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }
  
}

module.exports = new PostController();