const express = require("express");
const app = express();
app.use(express.json());

const usuarios = [
        { id: 1, name: "Carlos", email: "carlos@email.com" },
        { id: 2, name: "Ana", email: "ana@email.com" },
        { id: 3, name: "Pedro", email: "pedro@email.com" }
    ]; 


    let proximoId = Math.max(0,...usuarios.map(usuario => usuario.id)) + 1;
app.get("/usuarios",(req,res)=>{
   

    res.json(usuarios);
});

app.post("/usuarios",(req,res)=>{
    const {name , email} = req.body;

    if(typeof name !== "string"||
        typeof email !== "string"||
        !name.trim() ||
        !email.trim()
    ){
        return res.status(400).json({
            mensagem:"Nome e Email obrigatórios!"
        });
    }
    const novoUsuario ={
        id:proximoId++,
        name:name.trim(),
        email:email.trim()
    }

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
});