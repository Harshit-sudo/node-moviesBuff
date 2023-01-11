const express = require('express')
const Movie = require('../models/moviesModel.js')
const Rating = require('../models/ratingsModel.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const longestDurationMovies = async (req, res) => {
    try{
        const movies = await Movie.findAll({  
        attributes: ['tconst', 'primaryTitle', 'runtimeMinutes', 'genres'],
        limit: 10,
        order: [['runtimeMinutes', 'DESC']]})
        res.send(movies)
    } catch(e){
        res.status(400).send('Error in fetching longest duration movies')
    }
      
} 

const createNewMovies = async (req, res) => {
    try {
        const {tconst, titleType, primaryTitle, runtimeMinutes, genres} = req.body
        if(tconst && titleType && primaryTitle && runtimeMinutes && genres){
            const movie = await Movie.create({
                tconst,
                titleType,
                primaryTitle,
                runtimeMinutes,
                genres
            })
            res.status(201).send("Success")
        }
    } catch(e){
        res.status(400).send(`Error: ${e.errors[0].message}`)
    }
}

const averageRatingGreaterThanSix = async (req, res) => {
    try{
        const movies = await Rating.findAll({
            attributes: ['tconst', 'averageRating'],
            where: {averageRating: { [Op.gt]: 6}},
            include: [{
                model: Movie,
                attributes: ['primaryTitle', 'genres']
            }],
            order: [['averageRating', 'ASC']]
        })
        res.send(movies)
    } catch(e) {
        res.status(400).send('Error in finding movies Avg Rating Greater Than Six')
    }
}
module.exports = {
    longestDurationMovies,
    createNewMovies,
    averageRatingGreaterThanSix
}