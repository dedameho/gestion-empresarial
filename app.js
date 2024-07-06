import 'dotenv/config'
import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { connection } from './db/connection.js'
import debug from 'debug'
import { createRelations } from './db/relations.js'
import { errorHandler } from './utils/errorHandler.middleware.js'
import { ProductoRouter } from './routes/producto.route.js'
import { ClienteRouter } from './routes/cliente.route.js'
import { CotizacionRouter } from './routes/cotizacion.route.js'
const log = debug('app:main')
const app = express()

//config
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('short'));
app.use(cors({
    origin: '*'
}))

//Rutas
app.use(ProductoRouter)
app.use(ClienteRouter)
app.use(CotizacionRouter)


//Middleware de manejo de errores
app.use(errorHandler)

const PORT = process.env.PORT | 3000;

//run server
app.listen(PORT, async () => {
    try {
        await createRelations()
        await connection.sync({ alter: true })
        log(`Servidor corriendo en el puerto ${PORT}`)
    } catch (error) {
        log('Error', error)
    }

})