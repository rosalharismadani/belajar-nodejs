'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  class Posts extends Model {
    static associate(models) {
      Posts.belongsTo(models.Files, {
        foreignKey: 'thumbnail'
      });
    }
  }
  Posts.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Published'),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Posts',
    paranoid: true,
  });
  return Posts;
};