import { Router } from 'express';
import { login } from '../repository/usuarioRepository.js';

const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try{
        const usuario = req.body;
        const response = await login(usuario.email, usuario.senha);
        if(!response)
            throw new Error('Credenciais Inválidas')
        resp.send(response)
    } catch(err){
        resp.status(401).send({
            error:err.message
        })
    }
})

export default server 