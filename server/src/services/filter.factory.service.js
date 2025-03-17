exports.createFilters = (rawFilters) => { 
    const mongooseFilters = {}

    for (const [key, value] of Object.entries(rawFilters)) {
        const filterObj = JSON.parse(value);
        switch (filterObj.matchMode) {
            case 'equals':
                mongooseFilters[key] = filterObj.value;
                break;
            case 'contains':
                mongooseFilters[key] = { $regex: filterObj.value, $options: 'i' };
                break;
            case 'startsWith':
                mongooseFilters[key] = { $regex: `^${filterObj.value}`, $options: 'i' };
                break;
            case 'endsWith':
                mongooseFilters[key] = { $regex: `${filterObj.value}$`, $options: 'i' };
                break;
            case 'between':
                mongooseFilters[key] = { $gte: filterObj.value[0], $lte: filterObj.value[1] };
                break;
        }
    }
    
    return mongooseFilters;
};