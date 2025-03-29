const Prestation = require('../../models/Prestation');

exports.createPrestation = async ({name, price}) => {
    let newPrestation = new Prestation({name, price});
    if (newPrestation.price < 0) {
        throw new Error('Price must be positive');
    }
    return newPrestation;
}

exports.getAllPrestations = async (page, size, filters) => {
    let prestations = await Prestation.find(filters).skip(page).limit(size);
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
    const result = await Prestation.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new Error('Prestation not found');
    }
    return { id };
};