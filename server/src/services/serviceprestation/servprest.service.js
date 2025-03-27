const ServicePrestation = require("../../models/ServicePrestation");

exports.createServicePrestation = async ({service, prestation}) => {
    let newServicePrestation = new ServicePrestation({service, prestation});
    return newServicePrestation;
}


exports.getAllServicePrestations = async (page, size, filters) => {
    let servicePrestations = await ServicePrestation.find(filters).skip(page).limit(size);
    return servicePrestations;
}


exports.deleteServicePrestation = async (id) => {
    const result = await ServicePrestation.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new Error('Service Prestation not found');
    }
    return { id };
};