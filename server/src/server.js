require('./config/dotenv');

const mongodb = require('./config/mongodb');
const server = require('./config/express');

// Making sure the database is connected before starting the server
mongodb.connect().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    });
}).catch((err) => {
    console.log(err);
});