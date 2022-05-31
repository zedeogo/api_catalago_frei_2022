import { Router } from 'express';
import { connection } from '../repository/connection.js';
import { cadastrarFilme, cadastrarImagem } from '../repository/filmeRepository.js';
import multer from 'multer'

const server= Router();
const upload= multer( { dest:'storage/capaFilmes' } );

server.post('/filme', async (req, resp) => {
    try{
        const filme = await req.body;
        if(!filme.usuario)
            throw new Error("Usuário Invalido")
        if(!filme.nome)
            throw new Error("Nome do filme Invalido")
        if(!filme.sinopse) 
            throw new Error("Sinopse Invalida")
        if(!filme.avaliacao)
            throw new Error("Avaliação Invalida")
        if(!filme.lancamento)
            throw new Error("Lançamento Invalido")
        if(!filme.disponivel)
            throw new Error("Disponibilidade Invalida")
        const response = await cadastrarFilme(filme)
        resp.send(response)
    } catch(err){
        resp.send({
            error: err.message
        })
    }
})

server.put('/filme/:id/capa',upload.single('capa'), async(req, resp)=>{
     try{
         const { id } = req.params;
         const imagem = req.file.path;

         const resposta = await cadastrarImagem(imagem,id);
         if(resposta!=1)
            throw new Error("Não é possivel salvar a imagem")
         resp.status(204).send
     }catch (err) {
         resp.status(400).send({
             erro:err.message
         })
     }
})

export default server