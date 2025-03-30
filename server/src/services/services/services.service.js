const Service = require('../../models/Service');
const ServicePrestation = require('../../models/ServicePrestation');

exports.createService = async (nameParam) => {
    const {name} = nameParam;
    let  newService = new Service({name});
    return newService;
};

exports.getAllServices = async (page, size, filters) => {
    let services = await Service.find(filters).skip(page).limit(size).lean();
    return services;
}

exports.getAllServicesWithPrestations = async (page, size, filters) => {
    let services = await this.getAllServices(page, size, filters);
    for (let service of services) {
        const servicePrestations = await ServicePrestation.find({
            service: service._id,
        }).populate("prestation");
        service.prestations = servicePrestations.map(sp => sp.prestation);
    }
    return services;
}

exports.updateService = async (id, name) => {
    let service = await Service.findById(id);
    service.name = name;
    return service;
};

exports.deleteService = async (id) => {
    const result = await Service.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new Error('Service not found');
    }
    return { id };
};