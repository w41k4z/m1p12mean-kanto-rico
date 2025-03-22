require('./src/config/dotenv');

const mongodb = require('./src/config/mongodb');
const Service = require('./src/models/Service');
const Prestation = require('./src/models/Prestation');
const ServicePrestation = require('./src/models/ServicePrestation');

mongodb.connect().then(async () => {
    const services = await Service.insertMany([
      { name: "Entretien et Réparation" },
      { name: "Diagnostic et Contrôle Technique" }
    ]);

    const prestations = await Prestation.insertMany([
      { name: "Vidange d'huile", price: 50000 },
      { name: "Remplacement des plaquettes de frein", price: 120000 },
      { name: "Diagnostic électronique", price: 80000 },
      { name: "Contrôle technique complet", price: 100000 }
    ]);

    await ServicePrestation.insertMany([
      { service: services[0]._id, prestation: prestations[0]._id }, // Vidange d'huile → Entretien
      { service: services[0]._id, prestation: prestations[1]._id }, // Plaquettes de frein → Entretien
      { service: services[1]._id, prestation: prestations[2]._id }, // Diagnostic → Diagnostic et Contrôle
      { service: services[1]._id, prestation: prestations[3]._id }  // Contrôle technique → Diagnostic et Contrôle
    ]);
    process.exit(0);
});