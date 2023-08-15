import Masyarakat from "../model/MasyarakatModal.js";


export const getMasyarakat = async(req, res)=>{
    try {
        const response = await Masyarakat.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getMasyarakatById = async(req, res)=>{
    try {
        const response = await Masyarakat.findOne({where:{nik: req.params.nik}});
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const postMasyarakat = async(req, res)=>{
    
    const nama = req.body.nama
    const username = req.body.username
    const password = req.body.password
    const telp = req.body.telp

    try {
        await Masyarakat.create({nama: nama, username: username, password: password, telp: telp})
        res.status(201).json({msg: "Data berhasil ditambahkan"})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateMasyarakat = async(req, res)=>{
    const masyarakat = await Masyarakat.findOne({where:{nik: req.params.nik}})
    if(!masyarakat) return res.status(404).json({msg:"Data tidak ditemukan"})

    const nama = req.body.nama
    const username = req.body.username
    const password = req.body.password
    const telp = req.body.telp

    try {
        await Masyarakat.update({nama: nama, username: username, password: password, telp: telp},{where:{nik: req.params.nik}})
        res.status(201).json({msg:"Data berhasil diedit"})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteMasyarakat = async(req, res)=>{
    const masyarakat = await Masyarakat.findOne({where:{nik: req.params.nik}})
    if(!masyarakat) return res.status(404).json({msg:"Data tidak ditemukan"})

    try {
        await Masyarakat.destroy({where:{nik: req.params.nik}})
        res.status(201).json({msg:"Data berhasil dihapus"})
    } catch (error) {
        console.log(error.message)
    }
}