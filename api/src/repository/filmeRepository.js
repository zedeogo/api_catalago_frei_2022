import { connection } from "./connection.js";

export async function cadastrarFilme(filme){
    const command = `
        INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
            VALUES (?, ?, ?, ?, ?, ?);
    `
    const [lines] = await connection.query(command, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
    filme.id = lines.insertId
    return filme;
}

export async function cadastrarImagem(imagem, id){
    const command = 
    `UPDATE tb_filme 
        SET img_filme     = ?
      WHERE id_filme      = ?`

      const [lines] = await connection.query(command [imagem, id]);
      return lines.affectedRows;
}