const Sequelize = require('sequelize')
const sequelize = require('../db/databaseConnect.js')

const Movie = sequelize.define('movie', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   tconst: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    titleType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    primaryTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
    runtimeMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    genres: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, {
    timestamps: false
  });

  module.exports = Movie