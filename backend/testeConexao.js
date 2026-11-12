const db = require("./db");

async function testarConexao() {
    try {
        const [resultado] = await db.query("SELECT 1 AS conectado");

        console.log("Conexão realizada com sucesso!");
        console.log(resultado);
    } catch (erro) {
        console.error("Erro ao conectar:", erro.message);
    } finally {
        await db.end();
    }
}

testarConexao();