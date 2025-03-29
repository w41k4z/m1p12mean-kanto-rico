require('./config/dotenv');

const mongodb = require('./config/mongodb');
const server = require('./config/express');
const socketService = require('./config/socket');

// Making sure the database is connected before starting the server
mongodb.connect().then(() => {
    socketService.initialize(server);
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    });
}).catch((err) => {
    console.log(err);
});