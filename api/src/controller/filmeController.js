import { cadastrarFilme, alterarImagem, listarTodosFilmes, buscarPorId, buscarPorNome, deletarFilme, alterarFilme } from '../repository/filmeRepository.js';

import multer from 'multer'
import { Router } from 'express';

import { connection } from '../repository/connection.js';

const server= Router();
const upload= multer({ dest:'storage/capasFilmes' });

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
        if(filme.disponivel == undefined)
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

         const resposta = await alterarImagem(imagem, id);

         if(resposta!=1)
            throw new Error("Não é possivel salvar a imagem")
            
         resp.status(204).send
     }catch (err) {
         resp.status(400).send({
             erro:err.message
         })
     }
})

server.get('/filme', async (req, resp)=>{
    try {
        const resposta = await listarTodosFilmes()
        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})

server.get('/filme/busca', async (req, resp)=>{
    try {
        const {nome} = req.query;

        const resposta = await buscarPorNome(nome)

        if(resposta.length == 0)
            resp.status(404).send([])
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme/:id', async (req, resp)=>{
    try {
        const {id} = req.params;

        const resposta = await buscarPorId(Number(id))

        if(!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) =>{
    try {
        
        const {id} = req.params;

        const resposta = await deletarFilme(id)

        if(resposta != 1)
            throw new Error('Filminho não deletado');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;

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

    if(filme.disponivel == undefined)
        throw new Error("Disponibilidade Invalida")

        const resposta = await alterarFilme(id, filme);
        if(resposta != 1)
            throw new Error('Filme não alterado');
        else
            resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


export default server