'use strict';
const { Model, UUIDV4, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {

    static associate(models) {
      Users.belongsTo(models.Files, {
        foreignKey: 'avatar'
      });
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Super Admin', 'Creator'),
      allowNull: false
    },
    status: {
      type : DataTypes.ENUM('Active', 'Suspend'),
      allowNull: false
    },
    avatar: {
      type: DataTypes.UUID,
      allowNull: true
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
    modelName: 'Users',
    paranoid: true,
  });
  return Users;
};