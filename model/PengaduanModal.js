import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tanggapan from "./TanggapanModal.js";

const {DataTypes} = Sequelize

const Pengaduan = db.define('pengaduans',{
    id_pengaduan: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tgl_pegaduan: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    nik: DataTypes.INTEGER,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    fotoName: DataTypes.STRING,
    status: DataTypes.STRING
},{
    freezeTableName: true
})

Pengaduan.hasMany(Tanggapan, {foreignKey:'id_pengaduan'})

export default Pengaduan;

(async()=>{
    await db.sync({alter:true});
})();