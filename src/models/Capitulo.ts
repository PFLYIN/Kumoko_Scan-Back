import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class Capitulo extends Model {
  public id!: number;
  public manga_id!: number;
  public numero!: number;
  public titulo!: string;
}

Capitulo.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  manga_id: { type: DataTypes.INTEGER, allowNull: false },
  numero: { type: DataTypes.DECIMAL(5, 2), allowNull: false }, // Suporta capítulos tipo 1.5
  titulo: { type: DataTypes.STRING(255), allowNull: true }
}, {
  sequelize: db,
  tableName: 'capitulos',
  timestamps: false
});

export default Capitulo;