import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class Manga extends Model {
  public id!: number;
  public nome!: string;
  public volume!: number;
  public capa_url!: string;
}

Manga.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(300), allowNull: false },
  volume: { type: DataTypes.INTEGER, allowNull: false },
  capa_url: { type: DataTypes.STRING(255), allowNull: true }
}, { 
  sequelize: db, 
  tableName: 'manga', 
  timestamps: false // Deixamos o SQL cuidar das datas
});

export default Manga;