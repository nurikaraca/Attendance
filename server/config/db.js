const mongoose = require('mongoose')

const db = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() =>{
        console.log("Mongo db connect")
    }).catch((error) =>{
        console.log('Error ->' + error)
    })
}
module.exports = db;