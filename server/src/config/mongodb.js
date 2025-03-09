const mongoose = require('mongoose');

const mongodb = {
    connect: async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("Mongo database connected");
        } catch (error) {   
            console.log(error);
        }
    }
}

module.exports = mongodb;