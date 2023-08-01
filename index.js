import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import router from "./routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(router);
app.use(express.static("public"))

app.listen(5000, ()=> console.log('Server On'));