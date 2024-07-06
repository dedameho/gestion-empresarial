import { Model, DataTypes } from 'sequelize'
import { connection } from '../connection.js'

export class Cliente extends Model { }

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nit:{
        type: DataTypes.STRING(11),
        allowNull:false
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ciudad:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize: connection,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: false,
    indexes:[
        {
            unique:true,
            fields:['email']
        }
    ]
});