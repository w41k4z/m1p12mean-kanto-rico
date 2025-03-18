const Service = require('../models/Service');

exports.createService = async (nameParam) => {
    const {name} = nameParam;
    let  newService = new Service({name});
    return newService;
};

exports.getAllServices = async (page, size, filters) => {
    let services = await Service.find(filters).skip(page).limit(size);
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