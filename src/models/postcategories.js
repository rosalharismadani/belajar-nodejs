'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategories extends Model {
    static associate(models) {
    }
  }
  PostCategories.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PostCategories',
    paranoid: true
  });
  return PostCategories;
};