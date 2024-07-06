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
    cotizacionId: {
        type: DataTypes.INTEGER,
    },
    ordenCompra:{
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Pendiente por firma'
    }
}, {
    sequelize: connection,
    modelName: 'Remision',
    tableName: 'Remisiones',
    timestamps: false,
    indexes:[{
        unique: true,
        fields: ['cotizacionId']
    }]
});