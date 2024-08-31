import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Reading extends Model {
    public id!: number;
    public reading_value!: number;
    public timestamp!: Date;
    public confirmed!: boolean;
}

Reading.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reading_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Reading',
});
