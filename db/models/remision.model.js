import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Remision extends Model {}

Remision.init({
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
    ordenCompraId: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'Remision',
    tableName: 'Remisiones',
    timestamps: false
});