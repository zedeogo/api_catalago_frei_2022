import { connection } from "./connection.js";

export async function cadastrarFilme(filme){
    const command = `
        INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
            VALUES (?, ?, ?, ?, ?, ?)
    `
    const [lines] = await connection.query(command, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
    filme.id = lines.insertId
    return filme;
}

export async function alterarImagem(imagem, id){
    const command = `UPDATE tb_filme 
            SET img_filme     = ?
          WHERE id_filme      = ?
    `

    const [lines] = await connection.query(command, [imagem, id]);
    return lines.affectedRows;
}

export async function listarTodosFilmes(){
    const command = 
    `SELECT id_filme			id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
       FROM tb_filme`;

    const [lines] = await connection.query(command);
    return lines;
}

export async function buscarPorId(id){
    const command = `
         SELECT id_filme			id,
                nm_filme			nome,
                vl_avaliacao		avaliacao,
                dt_lancamento	    lancamento,
                bt_disponivel	    disponivel
           FROM tb_filme
          WHERE id_filme = ?
    `

    const [lines] = await connection.query(command, [id]);
    return lines[0];
}

export async function buscarPorNome(nome){
    const command = `
         SELECT id_filme			id,
                nm_filme			nome,
                vl_avaliacao		avaliacao,
                dt_lancamento	    lancamento,
                bt_disponivel	    disponivel
           FROM tb_filme
          WHERE nm_filme like ?
      `; 
    const [lines] = await connection.query(command, [`%${nome}%`]);
    return lines;
}

export async function deletarFilme(id){
    const command = `
    DELETE FROM tb_filme
           WHERE id_filme = ?`;
    
    const [lines] = await connection.query(command, [id]);
    return lines.affectedRows;
}

export async function alterarFilme(id, filme){
    const command =
    `UPDATE tb_filme 
        SET nm_filme      = ?,
            ds_sinopse    = ?,
            vl_avaliacao  = ?,
            dt_lancamento = ?,
            bt_disponivel = ?,
            id_usuario    = ?
      WHERE id_filme      = ?`;

      const [lines] = await connection.query(command, [ filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, filme.usuario, id]);
      return lines.affectedRows;
}