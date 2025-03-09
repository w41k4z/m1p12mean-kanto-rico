require('./src/config/dotenv');

const mongodb = require('./src/config/mongodb');
const User = require('./src/models/User');
const Role = require('./src/models/Role');

mongodb.connect().then(async () => {
    console.log('Seeding roles..');
    const roles = Object.values(require('./src/config/roles'));
    const roleModels = {};
    for(const role of roles) {
        let existingRole = await Role.findOne({ name: role });
        if (!existingRole) {
            existingRole = await Role.create({ name: role });
        }
        roleModels[role] = existingRole;
    }
    console.log('Roles seeded:', roleModels);

    console.log('Seeding manager user..');
    let existingManager = await User.findOne({ username: 'admin@example.com' });
    if (!existingManager) {
        existingManager = await User.create({
            firstName: 'Jean',
            lastName: 'Rakoto',
            username: 'admin@example.com',
            password: 'admin',
            role: roleModels.manager._id
        });
    }
    console.log('Manager seeded:', existingManager);
    process.exit(0);
});