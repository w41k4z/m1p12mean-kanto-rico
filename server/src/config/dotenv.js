const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
    const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
    dotenv.config({ path: envFile });
}