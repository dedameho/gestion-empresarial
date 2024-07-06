import { Cliente } from "../db/models/clientes.model.js";
import { request, response } from "express";
import { Op } from "sequelize";
import { ErrorResponse } from "../utils/errorResponse.js";
import debug from 'debug'
const log = debug('app:cliente')

//Creación de la clase ClientCntroller que servirá como controlador para las operaciones que involucran a los clientes

export class ClienteController {

    static async createClient(req = request, res = response, next) {
        try {
            const client = { ...req.body }
            const newClient = await Cliente.create(client)
            log('Cliente creado')
            res.send(newClient)
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async getClients(req = request, res = response, next) {
        try {
            const { nombre, nit, ciudad } = req.query;
            const searchCriteria = {};

            if (nombre) {
                searchCriteria.nombre = { [Op.like]: `%${nombre}%` };
            }

            if (nit) {
                searchCriteria.nit = { [Op.like]: `%${nit}%` };
            }

            if (ciudad) {
                searchCriteria.ciudad = { [Op.like]: `%${ciudad}%` };
            }

            const clients = await Cliente.findAll({
                where: searchCriteria,
                order:[['nombre','ASC']]
            });

            log('Clientes obtenidos');
            res.send(clients);
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async editClient(req = request, res = response, next) {
        try {
            const clientData = { ...req.body }
            const { id } = req.params
            const client = await Cliente.findOne({
                where: {
                    id: id
                }
            })
            if (!client) {
                throw new ErrorResponse('Cliente no encontrado', 404)
            }
            await client.update(clientData)
            log('Cliente editado')
            res.end()
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async deleteClient(req = request, res = response, next) {
        try {
            const { id } = req.params
            const client = await Cliente.findOne({
                where: {
                    id: id
                }
            })
            if (!client) {
                throw new ErrorResponse('Cliente no encontrado', 404)
            }
            await client.destroy()
            log('Cliente eliminado')
            res.status(204).end()
        } catch (error) {
            log('Error', error)
        }
    }
}