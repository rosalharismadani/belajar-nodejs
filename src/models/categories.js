'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  class Categories extends Model {
    static associate(models) {
    }
  }
  Categories.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'Categories',
    paranoid: true,
  });
  return Categories;
};