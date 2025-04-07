const ServicePrestation = require("../../models/ServicePrestation");

exports.createServicePrestation = async ({ service, prestation }) => {
    const existing = await ServicePrestation.findOne({ service, prestation });

    if (existing) {
        throw new Error('This prestation already exists in the service');
    }
    let newServicePrestation = new ServicePrestation({ service, prestation });
    return newServicePrestation;
}

exports.createServicePrestation = async ({ service, prestation }) => {
    const existing = await ServicePrestation.findOne({ service, prestation });

    if (existing) {
        if (existing.status === 'OK') {
            throw new Error('This prestation already exists in the service');
        }
        existing.status = 'OK';
        await existing.save();
        return existing;
    }
    const newServicePrestation = new ServicePrestation({
        service,
        prestation
    });

    await newServicePrestation.save();
    return newServicePrestation;
};


exports.getAllServicePrestations = async (page, size, filters) => {
    let servicePrestations = ServicePrestation.find(filters).skip(page).limit(size);
    return servicePrestations;
}


exports.getPrestationsByService = async (serviceName) => {
    const query = {
        service: serviceName,
        status: 'OK' 
    };

    const servicePrestations = await ServicePrestation.find(query)
        .populate({
            path: 'prestation',
            match: { status: 'OK' }
        })
        .exec();
        
    const validPrestations = servicePrestations.filter(sp => sp.prestation !== null);

    console.log("Service-Prestation relationships:", JSON.stringify(validPrestations, null, 2));
    validPrestations.forEach((sp, index) => {
        console.log(`\nPrestation ${index + 1}:`);
        console.log("Relationship ID:", sp._id);
        console.log("Service ID:", sp.service);
        console.log("Prestation details:", sp.prestation);
    });

    return validPrestations.map(sp => sp.prestation);
};

exports.deleteServicePrestation = async (service, prestation) => {
    try {
        const servicePrestation = await ServicePrestation.findOne({ service, prestation });

        if (!servicePrestation) {
            throw new Error('ServicePrestation not found');
        }
        servicePrestation.status = 'Supprime';
        await servicePrestation.save();
        return servicePrestation;
    } catch (error) {
        console.error('Error updating ServicePrestation status:', error);
        throw error;
    }
};