const Prestation = require('../../models/Prestation');

exports.createPrestation = async ({name, price}) => {
    let newPrestation = new Prestation({name, price});
    if (newPrestation.price < 0) {
        throw new Error('Price must be positive');
    }
    return newPrestation;
}

exports.getAllPrestations = async (page, size, filters) => {
    const query = {
        status: 'OK'
    };
    if (filters && typeof filters === 'object' && filters.search) {
        query.name = { $regex: filters.search, $options: 'i' };
    }
    const [prestations] = await Promise.all([
        Prestation.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({ createdAt: -1 })
            .lean(),
            Prestation.countDocuments(query)
    ]);
    return prestations;
}


exports.updatePrestation = async (id, name, price) => {
    let prestation = await Prestation.findById(id);
    prestation.name = name;
    prestation.price = price;
    if (prestation.price < 0) {
        throw new Error('Price must be positive');
    }
    return prestation;
}

exports.deletePrestation = async (id) => {
    let prestation = await Prestation.findById(id);
    prestation.status = 'Supprime';
    await prestation.save();
};