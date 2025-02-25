import knex from 'knex';
import knexConfig from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
const theSecretPassword = "fdedf3$#@GfedgsFVSw34trw#VSG@#%^FGV32VF"
export default knex(config);
