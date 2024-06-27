import 'dotenv/config'
import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { connection } from './db/connection.js'
import debug from 'debug'
import { createRelations } from './db/relations.js'
const log = debug('app:main')
const app = express()

//config
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors({
    origin: '*'
}))

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