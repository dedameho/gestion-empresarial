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
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    sequelize: connection,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: false
});