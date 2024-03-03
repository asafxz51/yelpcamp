
const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1/yelpDB', {
 useNewUrlParser: true,
 useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error.'))
db.once('open', () => {
 console.log('Database Connected!')
})

const sample = (array) => {
 return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
 await Campground.deleteMany({})
 for (let i = 0; i < 350; i++) {
  const random1000 = Math.floor(Math.random() * 1000);
  const price = Math.floor(Math.random() * 20) + 10
  const camp = new Campground({
   author: '65ce6646a67ec02d57ce7fa5',
   title: `${sample(descriptors)} ${sample(places)}`,
   location: `${cities[random1000].city}, ${cities[random1000].state}`,
   description: 'Campgrounds. The term camp comes from the Latin word campus, meaning "field". Therefore, a campground consists typically of open pieces of ground where a camper can pitch a tent or park a camper. More specifically a campsite is a dedicated area set aside for camping and for which often a user fee is charged.',
   price: price,
   geometry: {
    type: 'Point',
    coordinates: [
     cities[random1000].longitude,
     cities[random1000].latitude
    ]
   },
   images: {
    url: 'https://res.cloudinary.com/dgbckxkzy/image/upload/v1708598134/YelpCamp/lgnnjrgkuut0kgdgxx0l.jpg',
    filename: 'YelpCamp/zgkp15jq5wwe5h1qq2og'
   }


  })
  await camp.save()
 }
}

seedDB().then(() => {
 mongoose.connection.close()
})