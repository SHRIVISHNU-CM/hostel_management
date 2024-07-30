const mongoose = require('mongoose')

const connect = ()=>{
    mongoose.connect(process.env.DB)
    .then(()=>console.log("MongoDB is Connected"))
    .catch((e) => console.log(e))
}

module.exports = connect