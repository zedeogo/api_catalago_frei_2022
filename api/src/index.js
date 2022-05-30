import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connection } from './repository/connection.js'
import filmeController from './controller/filmeController.js'
import usuarioController from './controller/usuarioController.js'

const server = express();
server.use(cors());
server.use(express.json());

//endpoints
server.use(usuarioController);
server.use(filmeController);

server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`))