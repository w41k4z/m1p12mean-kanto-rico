const { Server } = require('socket.io');

class SocketService {
    constructor() {
        this.io = null;
        this.clients = {};
    }

    initialize(server) {
        if (!this.io) {
            this.io = new Server(server, { cors: { origin: '*' } });

            this.io.on('connection', (socket) => {
                console.log("User connected:", socket.id);

                // Register user
                socket.on('register', (userId) => {
                    this.clients[userId] = socket.id;
                    console.log(`User with id ${userId} registered with socket ${socket.id}`);
                });

                // Disconnect user
                socket.on('disconnect', () => {
                    const userId = Object.keys(this.clients).find(key => this.clients[key] === socket.id);
                    if (userId) delete this.clients[userId];
                    console.log("User disconnected:", socket.id);
                });
            });
        }
    }

    sendNotification(clientId, message) {
        const socketId = this.clients[clientId];
        if (socketId) {
            this.io.to(socketId).emit('notification', { message });
            console.log(`Notification sent to client ${clientId}`);
        } else {
            console.log(`Client ${clientId} is offline. Cannot send real-time notification.`);
        }
    }
}

module.exports = new SocketService();