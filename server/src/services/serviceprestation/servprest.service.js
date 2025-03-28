const ServicePrestation = require("../../models/ServicePrestation");

exports.createServicePrestation = async ({service, prestation}) => {
    let newServicePrestation = new ServicePrestation({service, prestation});
    return newServicePrestation;
}


exports.getAllServicePrestations = async (page, size, filters) => {
    let servicePrestations = await ServicePrestation.find(filters).skip(page).limit(size);
    return servicePrestations;
}

exports.getPrestationsByService = async (service) => {
    const servicePrestations = await ServicePrestation.find({ 
        service: { $regex: new RegExp(`^${service}$`, 'i') }
    }).populate('prestation').exec();
    
    if (!servicePrestations || servicePrestations.length === 0) {
        throw new Error('No prestations found for this service');
    }
    return servicePrestations.map(sp => sp.prestation);
}


exports.deleteServicePrestation = async (id) => {
    const result = await ServicePrestation.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new Error('Service Prestation not found');
    }
    return { id };
};