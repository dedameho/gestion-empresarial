import { Cliente } from "./models/clientes.model.js";
import { Cotizacion } from "./models/cotizacion.model.js";
import { DetalleCotizacion } from "./models/detalleContizacion.model.js";
import { DetalleOrdenCompra } from "./models/detalleOrdenCompra.model.js";
import { OrdenCompra } from "./models/ordenCompra.model.js";
import { Producto } from "./models/producto.model.js";
import { Remision } from "./models/remision.model.js";

export async function createRelations() {
    Cliente.hasMany(Cotizacion, { foreignKey: 'clienteId' });
    Cotizacion.belongsTo(Cliente, { foreignKey: 'clienteId' });

    Cliente.hasMany(OrdenCompra, { foreignKey: 'clienteId' });
    OrdenCompra.belongsTo(Cliente, { foreignKey: 'clienteId' });

    Cliente.hasMany(Remision, { foreignKey: 'clienteId' });
    Remision.belongsTo(Cliente, { foreignKey: 'clienteId' });

    Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'cotizacionId' });
    DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'cotizacionId' });

    OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'ordenCompraId' });
    DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'ordenCompraId' });

    Producto.hasMany(DetalleCotizacion, { foreignKey: 'productoId' });
    DetalleCotizacion.belongsTo(Producto, { foreignKey: 'productoId' });

    Producto.hasMany(DetalleOrdenCompra, { foreignKey: 'productoId' });
    DetalleOrdenCompra.belongsTo(Producto, { foreignKey: 'productoId' });

    Cotizacion.hasMany(OrdenCompra, { foreignKey: 'cotizacionId' });
    OrdenCompra.belongsTo(Cotizacion, { foreignKey: 'cotizacionId' });

    OrdenCompra.hasMany(Remision, { foreignKey: 'ordenCompraId' });
    Remision.belongsTo(OrdenCompra, { foreignKey: 'ordenCompraId' });
}