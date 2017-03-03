import { Mongo } from 'meteor/mongo'

const Movies = new Mongo.Collection('movies')

Movies.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
})

export default Movies
