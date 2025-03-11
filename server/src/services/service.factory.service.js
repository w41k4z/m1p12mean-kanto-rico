const Service = require('../models/Service');
exports.createService = async (name) => {
    let  newService = new Service({name});
    return newService;
};
