const categories = require("../models/categories")

const get = (dataResponse) => {
  const {
    code = 200,
    messages = 'data sudah diterima',
    ...rest
  } = dataResponse

  return {
    code,
    messages,
    ...rest
  }
}

const getPost = (dataResponse) => {
  const {
    code = 200,
    messages = 'data sudah diterima',
    ...rest
  } = dataResponse

  return {
    code,
    messages,
    ...rest
  }
}

const createData = (dataResponse) => {
  return{
    code: 201,
    messages: 'Data berhasil dibuat',
    ...dataResponse
  }
}

const updateData = (dataResponse) => {
  return{
    code: 200,
    messages: 'Data berhasil diperbarui',
    ...dataResponse
  }
}

const deleteData = () => {
  return{
    code: 200,
    messages: 'Data berhasil dihapus'
  }
}

module.exports = {
  get,
  getPost,
  createData,
  updateData,
  deleteData
}