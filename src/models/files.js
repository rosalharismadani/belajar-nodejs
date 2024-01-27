'use strict';
const { Model, UUIDV4, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Files extends Model {
    static associate(models) {
    }
  }
  Files.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deletedAt:{
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'Files',
    paranoid: true,
  });
  return Files;
};