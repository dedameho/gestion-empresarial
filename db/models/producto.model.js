import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Producto extends Model {}

Producto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'Producto',
    tableName: 'Productos',
    timestamps: false,
    indexes:[
        {
            fields:['codigo'],
            unique:true
        }
    ]
});