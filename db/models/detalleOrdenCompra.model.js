import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class DetalleOrdenCompra extends Model {}

DetalleOrdenCompra.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ordenCompraId: {
        type: DataTypes.INTEGER,
    },
    productoId: {
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'DetalleOrdenCompra',
    tableName: 'DetalleOrdenCompra',
    timestamps: false
});