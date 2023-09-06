const pg = require('pg');
const {configDatabase, configDatabaseServer} = require('../config')
const Pool = new pg.Pool(configDatabase);
const PoolServer = new pg.Pool(configDatabaseServer)
module.exports = {Pool, PoolServer}

