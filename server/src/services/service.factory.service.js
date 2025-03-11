const Service = require('../models/Service');

exports.createService = async (name) => {
    let  newService = new Service({name});
    return newService;
};

exports.getAllServices = async () => {
    let services = await Service.find();
    return services;
}

exports.updateService = async (id, name) => {
    let service = await Service.findById(id);
    service.name = name;
    return service;
};

exports.deleteService = async (id) => {
    let service = await Service.findById(id);
    return service;
}