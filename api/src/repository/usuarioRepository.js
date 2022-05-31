import { connection } from "./connection.js";

export async function login(email, senha) {
    const command = `
        select id_usuario 		id,
               nm_usuario		nome,
               ds_email			email
          from tb_usuario
         where ds_email 		= ?
           and ds_senha			= ?
    `
    const [lines] = await connection.query(command, [email, senha]);
    return lines[0] 
}