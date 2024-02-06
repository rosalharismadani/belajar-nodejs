const {Files} = require('../models');
const BuildResponse = require('../helpers/BuildResponse');

class UploadController {
  async upload(req, res)  {
    try {
      
      const { filename, path, mimetype } = req.file

      const newPath = (windowsPath) => windowsPath.replace(/^(\w):|\\+/g,'/$1');
      const pathNew = newPath(`${path}`)

      const data = {
        type: mimetype,
        path: pathNew,
        filename,
        url: `http://localhost:3000/${pathNew}`
      }

      const result = await Files.create(data, { raw: true })

      const buildResponse = BuildResponse.createData({data: result})
    
      res.status(201).json(buildResponse)
    } catch(error) {
      res.status(500).json(error.message || 'internal server error')
    }
  }
  
}

module.exports = new UploadController();