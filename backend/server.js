const express = require("express");
const db = require("./db")
const app = express();
app.use(express.json());

let usuarios = [
        { id: 1, name: "Carlos", email: "carlos@email.com" },
        { id: 2, name: "Ana", email: "ana@email.com" },
        { id: 3, name: "Pedro", email: "pedro@email.com" }
    ]; 


    let proximoId = Math.max(0,...usuarios.map(usuario => usuario.id)) + 1;
app.get("/usuarios",async (req,res)=>{
try{
    const [usuarios] = await db.query("SELECT id,nome AS name,email FROM usuarios;");
 res.json(usuarios);
}catch(erro){
console.error(erro);
res.status(500).json({
    mensagem:"Erro ao buscar usuários!"
})
}

   
});

app.post("/usuarios",async(req,res)=>{
    try{
        const {name,email}= req.body ??{};
        if(typeof name !== "string"||
            typeof email !== "string"||
            !name.trim() ||
            !email.trim()
        ){
            return res.status(400).json({
                mensagem:"Nome e Email obrigatórios"
            });
        }
        const [resultado] = await db.execute(" INSERT INTO usuarios (nome,email) VALUES (?,?)",[name.trim(),email.trim()]);

        const novoUsuario = {
            id:resultado.insertId,
            name:name.trim(),
            email:email.trim()
        };
        res.status(201).json(novoUsuario);

    }catch(erro){
          console.error("Erro detalhado:", erro);

        res.status(500).json({
            mensagem:"Erro ao cadastrar"
        });
    }
})

app.get("/usuarios/:id",async(req,res)=>{
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <=0){
            return res.status(400).json({
                mensagem:"ID inválid!"
            });
        }
        const [usuarios] = await db.execute(
            "SELECT id,nome AS name,email FROM usuarios WHERE id = ?",[id]
        );
        if(usuarios.length === 0){
            return res.status(404).json({
                mensagem:"Usuário não encontrado!"
            });
        }
        res.json(usuarios[0]);
    }catch(erro){
        console.error(erro);
        res.status(500).json({
            mensagem:"Erro ao buscar usuário!"
        });
    }
});

app.delete("/usuarios/:id",async (req,res)=>{
    try{
    const id = Number(req.params.id);
        if(!Number.isInteger(id)|| id<0){
           return  res.status(400).json({
                mensagem:"Id inválido"
            });
        }
        const [resultado] = await db.execute(
            "DELETE FROM usuarios WHERE id = ?",[id]
        );

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensagem:"usuário não encontrado!"
            });
        }

        res.json({
            mensagem:"Usuário excluido!"
        });
}catch(erro){
    console.error(erro);
    res.status(500).json({
        mensagem:"Erro ao excluir usuário!"
    })
}

})

app.put("/usuarios/:id",async (req,res)=>{
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id<0){
            return res.status(400).json({
                mensagem:"Id Inválido!"
            });
        }
        const {name,email} = req.body ?? {};

        if(typeof name !== "string" ||
            typeof email !== "string"||
            !name.trim() ||
            !email.trim()
        ){
            return res.status(400).json({
                mensagem:"Nome e Email são obrigatórios!"
            });
        }

        const [resultado] = await db.execute(
            " UPDATE usuarios SET nome = ?,email = ? WHERE id = ?",[name.trim(),email.trim(),id]);

            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensagem:"Usuário não encontrado!"
                });
            }
            res.json({
                id:id,
                name: name.trim(),
                email: email.trim()
            });
    }catch(erro){
        console.error(erro);
        res.status(500).json({
            mensagem:"Erro ao atualizar usuário!"
        });
    }
});
app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
});