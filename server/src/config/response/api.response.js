module.exports = class ApiResponse {
    constructor(payload, message, errors) {
        this.payload = payload;
        this.message = message;
        this.errors = errors;
    }
}