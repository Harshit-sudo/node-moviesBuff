const Sequelize = require('sequelize')
const sequelize = require('../db/databaseConnect.js')

const Rating = sequelize.define('rating', {
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
    numVotes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      averageRating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
  }, {
  });

  module.exports = Rating