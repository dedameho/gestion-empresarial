import { Producto } from "../db/models/producto.model.js";
import { request, response } from "express";
import debug from 'debug'
import { ErrorResponse } from "../utils/errorResponse.js";
import { Op } from "sequelize";
const log = debug('app:producto')

//Creación de la clase ProductoController que servirá como controlador para las operaciones que involucran a los productos

export class ProductoController {

    static async createProduct(req = request, res = response, next) {
        try {
            const product = { ...req.body }
            const newProduct = await Producto.create(product)
            log('Producto creado')
            res.status(201).send(newProduct)
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async getProducts(req = request, res = response, next) {
        try {
            const { nombre, codigo } = req.query;
            const searchCriteria = {};

            if (nombre) {
                searchCriteria.nombre = { [Op.like]: `%${nombre}%` };
            }

            if (codigo) {
                searchCriteria.codigo = { [Op.like]: `%${codigo}%` };
            }
            const products = await Producto.findAll({
                where: searchCriteria
            });
            res.send(products)
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async editProduct(req = request, res = response, next) {
        try {
            const productData = { ...req.body }
            const { id } = req.params
            const product = await Producto.findOne({
                where: {
                    id: id
                }
            })
            if (!product) {
                throw new ErrorResponse('Producto no encontrado', 404)
            }
            await product.update(productData)
            log('Producto editado')
            res.end()
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

    static async deleteProduct(req = request, res = response, next) {
        try {
            const { id } = req.params
            const product = await Producto.findOne({
                where: {
                    id: id
                }
            })
            if (!product) {
                throw new ErrorResponse('Producto no encontrado', 404)
            }
            await product.destroy()
            log('Producto eliminado')
            res.status(204).end()
        } catch (error) {
            log('Error', error)
            next(error)
        }
    }

}