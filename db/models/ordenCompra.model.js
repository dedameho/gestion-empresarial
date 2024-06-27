import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class OrdenCompra extends Model {}

OrdenCompra.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    clienteId: {
        type: DataTypes.INTEGER,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cotizacionId: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize: connection,
    modelName: 'OrdenCompra',
    tableName: 'OrdenesCompra',
    timestamps: false
});