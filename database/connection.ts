import { Sequelize } from "sequelize";


const db = new Sequelize('esquema', 'postgres', '040104', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false
});

export default db