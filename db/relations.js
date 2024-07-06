import { Cliente } from "./models/clientes.model.js";
import { Cotizacion } from "./models/cotizacion.model.js";
import { DetalleCotizacion } from "./models/detalleContizacion.model.js";
import { Producto } from "./models/producto.model.js";
import { Remision } from "./models/remision.model.js";

export async function createRelations() {
    Cliente.hasMany(Cotizacion, {
        foreignKey: 'clienteId',
        constraints: true,
        onUpdate: 'CASCADE'
    });
    Cotizacion.belongsTo(Cliente, {
        foreignKey: 'clienteId',
        constraints: true,
        onUpdate: 'CASCADE'
    });

    Cotizacion.hasMany(DetalleCotizacion, {
        foreignKey: 'cotizacionId',
        constraints: true,
        onUpdate: 'CASCADE'
    });
    DetalleCotizacion.belongsTo(Cotizacion, {
        foreignKey: 'cotizacionId',
        constraints: true,
        onUpdate: 'CASCADE'
    });

    Producto.hasMany(DetalleCotizacion, {
        foreignKey: 'productoId',
        constraints: true,
        onUpdate: 'CASCADE'
    });
    DetalleCotizacion.belongsTo(Producto, {
        foreignKey: 'productoId',
        constraints: true,
        onUpdate: 'CASCADE'
    });


    Cotizacion.hasOne(Remision, {
        foreignKey: 'cotizacionId',
        constraints: true,
        onUpdate: 'CASCADE'
    });
    Remision.belongsTo(Cotizacion, {
        foreignKey: 'cotizacionId',
        constraints: true,
        onUpdate: 'CASCADE'
    });
}