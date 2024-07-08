import { request, response } from "express";
import { Remision } from "../db/models/remision.model.js";
import { Cotizacion } from '../db/models/cotizacion.model.js'
import { Op } from "sequelize";
import { ErrorResponse } from '../utils/errorResponse.js'
import debug from 'debug'
import { Cliente } from "../db/models/clientes.model.js";
import { DetalleCotizacion } from "../db/models/detalleContizacion.model.js";
import { Producto } from "../db/models/producto.model.js";
const log = debug('app:remisión')
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { generatePDF } from "../utils/remision.util.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class RemisionController {


    static async getRemisions(req = request, res = response, next) {
        try {
            const { fechaInicio, fechaFin, codigoCotizacion, codigo, ordenCompra, estado } = req.query;

            // Construir objeto de condiciones
            const where = {};
            const cotizacionFilters = {}

            if (fechaInicio && fechaFin && (fechaInicio != 'null' && fechaFin != 'null')) {
                where.fecha = {
                    [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
                };
            } else if (fechaInicio && fechaInicio != 'null') {
                where.fecha = { [Op.gte]: new Date(fechaInicio) };
            } else if (fechaFin && fechaFin != 'null') {
                where.fecha = { [Op.lte]: new Date(fechaFin) };
            }
            if (codigoCotizacion) cotizacionFilters.codigo = { [Op.like]: `%${codigoCotizacion}%` };
            if (codigo) where.codigo = { [Op.like]: `%${codigo}%` };
            if (ordenCompra) where.ordenCompra = { [Op.like]: `%${ordenCompra}%` };
            if (estado) where.estado = { [Op.like]: `%${estado}%` };

            const remisiones = await Remision.findAll({
                where: where,
                include: [{
                    model: Cotizacion,
                    where: cotizacionFilters
                }]
            });
            res.send(remisiones)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async createRemision(req = request, res = response, next) {
        try {
            const remision = { ...req.body }
            const remisionCreated = await Remision.create(remision)
            const completeRemision = await RemisionController.getRemision(remisionCreated.id)
            generatePDF(completeRemision)
            res.send(remisionCreated)
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async getRemision(id) {
        const remision = await Remision.findOne({
            where: { id: id },
            include: [
                {
                    model: Cotizacion,
                    include: [
                        {
                            model: Cliente
                        },
                        {
                            model: DetalleCotizacion,
                            include: [{
                                model: Producto
                            }]
                        }
                    ]
                }
            ]
        })
        return remision
    }

    static async getRemisionById(req = request, res = response, next) {
        try {
            const { id } = req.params
            const remision = await RemisionController.getRemision(id)
            if (!remision) throw new ErrorResponse('Remisión no encontrada', 404)
            res.send(remision)
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async signRemision(req = request, res = response, next) {
        try {
            const { id } = req.params
            const newState = { ...req.body }
            const remision = await Remision.findOne({ where: { id: id } })
            if (!remision) throw new ErrorResponse('Remisión no encontrada', 404)
            await remision.update(newState)
            res.end()
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async getPDFRemision(req = request, res = response, next) {
        try {
            const { remisionId } = req.params
            const pdfPath = path.join(__dirname, '../files', `${remisionId}.pdf`)
            res.sendFile(pdfPath)
        } catch (error) {
            log(error)
            next(error)
        }
    }

}