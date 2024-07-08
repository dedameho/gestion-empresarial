import { Cotizacion } from "../db/models/cotizacion.model.js";
import { request, response } from "express";
import { Op } from "sequelize";
import debug from 'debug'
import { ErrorResponse } from "../utils/errorResponse.js";
import { connection } from "../db/connection.js";
import { DetalleCotizacion } from "../db/models/detalleContizacion.model.js";
import { Cliente } from "../db/models/clientes.model.js";
import { Producto } from "../db/models/producto.model.js";
import { generatePDF } from "../utils/cotizacion.util.js";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const log = debug('app:cotizacion')

//Creación de la clase CotizacionController que servirá como controlador para las operaciones que involucran a las cotizaciones

export class CotizacionController {

    static async createBudget(req = request, res = response, next) {
        try {
            const { cotizacion, detalles } = req.body
            const createdBudget = await connection.transaction(async (t) => {
                const newBudget = await Cotizacion.create(cotizacion, { transaction: t })
                await CotizacionController.createBudgetDetails(detalles, newBudget, t)
                log('Cotización Creada')
                return newBudget
            })
            const budget = await CotizacionController.getBudget(createdBudget.id)
            generatePDF(budget)
            res.send(createdBudget)
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async createBudgetDetails(details, budget, transaction) {
        await Promise.all(details.map(async (detail) => {
            detail.cotizacionId = budget.id
            await DetalleCotizacion.create(detail, { transaction: transaction })
        }))
    }

    static async getBudgets(req = request, res = response, next) {
        try {
            const { clienteNombre, estado, fechaInicio, fechaFin, totalMin, totalMax, codigo } = req.query;

            let filters = {};
            let clienteFilters = {};


            if (clienteNombre && clienteNombre != 'null') {
                clienteFilters.nombre = {
                    [Op.like]: `%${clienteNombre}%`
                };
            }

            if (estado && estado != 'null') {
                filters.estado = {
                    [Op.like]: `%${estado}%`
                };
            }

            if (fechaInicio && fechaFin && (fechaInicio !='null' && fechaFin !='null')) {
                filters.fecha = {
                    [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
                };
            } else if (fechaInicio && fechaInicio !='null') {
                filters.fecha = {
                    [Op.gte]: new Date(fechaInicio)
                };
            } else if (fechaFin && fechaFin !='null') {
                filters.fecha = {
                    [Op.lte]: new Date(fechaFin)
                };
            }

            if (totalMin && totalMax && (totalMin > 0 && totalMax > 0)) {
                filters.total = {
                    [Op.between]: [totalMin, totalMax]
                };
            } else if (totalMin && totalMin > 0) {
                filters.total = {
                    [Op.gte]: totalMin
                };
            } else if (totalMax && totalMax > 0) {
                filters.total = {
                    [Op.lte]: totalMax
                };
            }

            if (codigo && codigo != 'null') {
                filters.codigo = {
                    [Op.like]: `%${codigo}%`
                };
            }
            const cotizaciones = await Cotizacion.findAll({
                where: filters,
                include: [
                    {
                        model: Cliente,
                        attributes: ['nombre'],
                        where: clienteFilters
                    }
                ]
            });

            res.send(cotizaciones);
        } catch (error) {
            log(error);
            next(error);
        }
    }


    static async getBudgetById(req = request, res = response, next) {
        try {
            const { id } = req.params
            const budget = await CotizacionController.getBudget(id)
            if (!budget) {
                throw new ErrorResponse('Cotización no encontrada', 404)
            }
            res.send(budget)
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async updateBudget(req = request, res = response, next) {
        try {
            const { id } = req.params;
            const { cotizacion, detalles } = req.body;
            const updatedBudget = await connection.transaction(async (t) => {

                const cot = await Cotizacion.findOne({
                    where: { id }
                });

                if (!cot) {
                    throw new ErrorResponse('No se encontró la cotización')
                }
                await cot.update(cotizacion, { transaction: t })
                const detailIds = detalles.map(detail => detail.id).filter(Boolean);
                await DetalleCotizacion.destroy({
                    where: {
                        cotizacionId: id,
                        id: {
                            [Op.notIn]: detailIds
                        }
                    },
                    transaction: t
                });
                await Promise.all(detalles.map(async (detail) => {
                    detail.cotizacionId = id;
                    await DetalleCotizacion.upsert(detail, { transaction: t });
                }));

                const updatedCotizacion = await Cotizacion.findByPk(id, {
                    include: [{ model: DetalleCotizacion }],
                    transaction: t
                });
                return updatedCotizacion;
            });
            const budget = await CotizacionController.getBudget(updatedBudget.id)
            generatePDF(budget)
            res.send(updatedBudget);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async deleteBudget(req = request, res = response, next) {
        try {
            const { id } = req.params
            const budget = await Cotizacion.findOne({
                where: { id }
            })
            if (!budget) {
                throw new ErrorResponse('No se encontró la cotización')
            }
            await budget.destroy()
            res.end()
        } catch (error) {
            log(error)
            next(error)
        }
    }

    static async getBudget(id) {
        const budget = await Cotizacion.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Cliente
                }, {
                    model: DetalleCotizacion,
                    include: [
                        {
                            model: Producto,
                            attributes: ['nombre', 'descripcion']
                        }
                    ]
                }
            ]
        })
        return budget
    }

    static async getPDFbudget(req = request, res = response, next) {
        try {
            const { cotizacionId } = req.params
            const pdfPath = path.join(__dirname, '../files', `${cotizacionId}.pdf`)
            res.sendFile(pdfPath)
        } catch (error) {
            log(error)
            next(error)
        }
    }

}