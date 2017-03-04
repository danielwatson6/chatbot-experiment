import { Meteor } from 'meteor/meteor'
import { fs } from 'meteor/peerlibrary:fs'

import Movies from '/imports/api/movies'
import '/imports/api/router'


Meteor.startup(() => {
  if (Movies.find().count() === 0) {
    // Use `fs` instead of importing the JSON itself - reading the data files
    // is only necessary if there is nothing in the Mongo database
    dataDir = process.cwd() + '/../web.browser/app/movie_metadata.json'
    const data = JSON.parse(fs.readFileSync(dataDir, 'utf8'))
    // Parsing results in stringified indices
    for (let i in data)
      Movies.insert(data[i])
  }
})
