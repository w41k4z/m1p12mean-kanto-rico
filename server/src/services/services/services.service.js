const Service = require('../../models/Service');
const ServicePrestation = require('../../models/ServicePrestation');

exports.createService = async (nameParam) => {
    const {name} = nameParam;
    let  newService = new Service({name});
    return newService;
};

exports.getAllServices = async (page, size, filters = {}) => {
    const query = {
        status: 'OK'
    };
    if (filters && typeof filters === 'object' && filters.search) {
        query.name = { $regex: filters.search, $options: 'i' };
    }

    const [services] = await Promise.all([
        Service.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({ createdAt: -1 })
            .lean(),
        Service.countDocuments(query)
    ]);

    return services;
};

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
    let service = await Service.findById(id);
    service.status = 'Supprime';
    await service.save();
};