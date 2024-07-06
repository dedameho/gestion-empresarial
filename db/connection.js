import { Sequelize } from "sequelize";
import { config} from "./config.js";
import debug from 'debug'
const log = debug('app:db')

//Cracion de instancia de conexion a la base de datos con Sequelize

export const connection = new Sequelize(config[process.env.NODE_ENV])


try {
    await connection.sync()
    log('Conexion a la base de datos exitosa.')
} catch (error) {
    log('Error',`Error de conexión a la base de datos: ${error.message}`)
}