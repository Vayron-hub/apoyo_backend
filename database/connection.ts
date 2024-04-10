import { Sequelize } from "sequelize";


const db = new Sequelize('GeoApoyo', 'postgres', '040104', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false
});

export default db