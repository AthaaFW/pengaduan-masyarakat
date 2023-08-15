import Pengaduan from "../model/PengaduanModal.js";
import path from 'path';
import fs from 'fs';
import { where } from "sequelize";

export const getPengaduan = async(req,res)=>{
    try {
        const response = await Pengaduan.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const postPengaduan = (req,res)=>{
    if(req.files === null) return res.status(400).json({msg:"Pengaduan Kosong"});
    const nik = req.body.nik;
    const isi = req.body.isi;
    const status = "Belum";
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTyped = ['.jpg', '.png', '.jpeg']; 

    if(!allowedTyped.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Pengaduan.create({nik: nik, foto: url, isi_laporan: isi, status: status, fotoName: fileName});
            res.status(201).json({msg: "Pengaduan diajukan"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const getPengaduanById = async(req, res)=>{
    try {
        const pengaduan = await Pengaduan.findOne({
            where:{
                id_pengaduan : req.params.id_pengaduan
            }
        });
        res.json(pengaduan);
    } catch (error) {
        console.log(error.message);
    }

}

export const updatePengaduan = async(req, res)=>{
    const pengaduan = await Pengaduan.findOne({where:{id_pengaduan : req.params.id_pengaduan}})
    if(!pengaduan) return res.status(404).json({msg: "Pengaduan tidak ditemukan"})
    const isi = req.body.isi;
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTyped = ['.jpg', '.png', '.jpeg']; 

    if(!allowedTyped.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Pengaduan.update({foto: url, isi_laporan: isi, fotoName: fileName},{where:{id_pengaduan:req.params.id_pengaduan}})
            res.status(201).json({msg: "Pengaduan diajukan"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const deletePengaduan = async(req, res)=>{
    const pengaduan = await Pengaduan.findOne({where:{id_pengaduan: req.params.id_pengaduan}})
    if(!pengaduan) return res.status(404).json({msg: "Pengaduan tidak ditemukan"})

    try {
        const filePath = `./public/images/${pengaduan.fotoName}`;
        fs.unlinkSync(filePath)
        await Pengaduan.destroy({where:{id_pengaduan:req.params.id_pengaduan}})
        res.status(201).json({msg: "Pengaduan dibatalkan"});
    } catch (error) {
        console.log(error.message);
    }
}
