import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class DetalleCotizacion extends Model {}

DetalleCotizacion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cotizacionId: {
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
    modelName: 'DetalleCotizacion',
    tableName: 'DetalleCotizacion',
    timestamps: true
});