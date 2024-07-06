import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Cotizacion extends Model { }

Cotizacion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    clienteId: {
        type: DataTypes.INTEGER,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    iva: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 19
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: connection,
    modelName: 'Cotizacion',
    tableName: 'Cotizaciones',
    createdAt: false,
    updatedAt: true,
    indexes: [{
        unique: true,
        fields: ['codigo']
    }],
    hooks: {
        beforeCreate: async (cotizacion, options) => {
            const year = new Date().getFullYear();
            const count = await Cotizacion.count();
            const consecutivo = count + 1;
            cotizacion.codigo = `COT${year}${consecutivo}`;
        }
    }
});