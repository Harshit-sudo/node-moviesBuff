const express = require('express')
require('dotenv').config()
const sequelize = require('./db/databaseConnect.js')
const Movie = require('./models/moviesModel.js')
const Rating = require('./models/ratingsModel.js')
const csv=require('csvtojson')
const {longestDurationMovies, createNewMovies, averageRatingGreaterThanSix} = require('./controllers/moviesController.js')
const moviesCsvPath ='./csv/movies.csv'
const ratingsCsvPath ='./csv/ratings.csv'


Movie.hasMany(Rating, {
    foreignKey:"movieId"
})
Rating.belongsTo(Movie,{
  foreignKey: "movieId"
})

const runSequelize = async () => {
   try {
     await sequelize.sync({force: true})
     const moviesArray =await csv().fromFile(moviesCsvPath);
     const ratingsArray = await csv().fromFile(ratingsCsvPath)
     for (let i = 0;i<moviesArray.length;i++){
     const movie = await Movie.create(moviesArray[i])
     for(let j = 0;j<ratingsArray.length;j++){
      if(moviesArray[i].tconst === ratingsArray[j].tconst){
        movie.createRating(ratingsArray[j])
      }
     }
    }

  } catch(e) {
    console.log(e)
   }
}


runSequelize()

const app = express()
app.use(express.json())
app.get('/api/v1/longest-duration-movies',longestDurationMovies)

app.post('/api/v1/new-movie', createNewMovies)

app.get('/api/v1/top-rated-movies', averageRatingGreaterThanSix)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})

