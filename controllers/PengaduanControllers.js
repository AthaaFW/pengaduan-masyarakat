import Masyarakat from "../model/MasyarakatModal.js";
import Petugas from "../model/PetugasModal.js";
import Tanggapan from "../model/TanggapanModal.js";
import Pengaduan from "../model/PengaduanModal.js";
import path from 'path';
import fs from 'fs';

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
    const status = req.body.status
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTyped = ['.jpg', '.png', '.jpeg']; 

    if(!allowedTyped.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Pengaduan.create({nik: nik, foto: url, isi_laporan: isi, status: status});
            res.status(201).json({msg: "Pengaduan diajukan"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const getPengaduanById = async(res, req)=>{
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

export const postTanggapan = async(res, req)=>{
    // const pengaduan = await Pengaduan.findAll({});
    // if(!pengaduan) return res.status(404).json({msg: "Pengaduan tidak ditemukan"});
    // res.status(200).json({msg: "Pengaduan ditemukan"})
}