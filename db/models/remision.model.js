import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Remision extends Model { }

Remision.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    cotizacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
    },
    ordenCompra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendiente por firma'
    }
}, {
    sequelize: connection,
    modelName: 'Remision',
    tableName: 'Remisiones',
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['cotizacionId']
    },
    {
        unique: true,
        fields: ['codigo']
    },
    {
        unique: true,
        fields: ['ordenCompra']
    }],
    hooks: {
        beforeCreate: async (remision, options) => {
            const year = new Date().getFullYear();
            const count = await Remision.findOne({
                order:[['id','DESC']]
            });
            const consecutivo = count.id + 1;
            remision.codigo = `INNC-${consecutivo}-${year}`;
        }
    }
});