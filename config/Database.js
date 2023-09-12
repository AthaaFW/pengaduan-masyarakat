import { Sequelize } from "sequelize";

const db = new Sequelize('db_athaa', 'root', '',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;