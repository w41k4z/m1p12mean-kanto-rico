const mongoose = require('mongoose');

const mongodb = {
    instance: mongoose,
    connect: async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("Mongo database connected");
        } catch (error) {   
            console.log(err);
        }
    }
}

module.exports = mongodb;