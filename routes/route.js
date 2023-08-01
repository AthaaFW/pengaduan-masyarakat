import express from 'express';
import { getPengaduan, postPengaduan, postTanggapan, getPengaduanById } from '../controllers/PengaduanControllers.js';

const router = express.Router();

router.get('/pengaduan', getPengaduan)
router.get('/pengaduan/:id_pengaduan', getPengaduanById)
// router.get('/tanggapan/:id_pengaduan', getTanggapan)
router.post('/pengaduan', postPengaduan)
router.get('/tanggapan/:id_pengaduan', postTanggapan)


export default router