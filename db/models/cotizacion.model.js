import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Cotizacion extends Model {}

Cotizacion.init({
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
    }
}, {
    sequelize:connection,
    modelName: 'Cotizacion',
    tableName: 'Cotizaciones',
    timestamps: false
});