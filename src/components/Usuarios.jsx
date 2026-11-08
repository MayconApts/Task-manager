import {useState,useEffect} from 'react'
function Usuarios(){
    const [usuarios,setUsuarios] = useState([]);
    const [carregando,setCarregando] = useState(true);
    const [erro,setErro] = useState(null);
    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [mensagem,setMensagem] = useState("");
    const [cadastrando,setCadastrando] = useState(false);
    const [excluindoId,setExcluindoId] = useState(null);
    const [editandoId,setEditandoId] = useState(null);
    const [nomeEditando,setNomeEditando] = useState("");
    const [emailEditando,setEmailEditando] = useState("");
    const [salvandoEdicao,setSalvandoEdicao] = useState(false);
    

    async function buscarUsuarios(){
        setCarregando(true);
        setErro(null);
        try{
            let resposta ;
        try{
         resposta = await fetch("https://jsonplaceholder.typicode.com/users")}
         catch(erro){
            
            throw new Error("Erro temporário!");
        }
        if(!resposta.ok){
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }
    

        const dados = await resposta.json();

        setUsuarios(dados);
        }catch(erro){
            if(erro.name === "SyntaxError"){
                setErro("Dados inválidos!");
            } else if(erro.name === "TypeError"){
                setErro("Falha na conexão");
            }
            else{
                setErro(erro.message);
            }
        }finally{
        setCarregando(false);
    }}
    useEffect(()=>{buscarUsuarios();},[]);

    

    async function cadastrarUsuario(e){
        e.preventDefault();

        if(nome.trim() === "" || email.trim() === ""){
            setMensagem("Preencha os campos!");
            return
        }

        const novoUsuario ={
            name:nome,
            email:email
        }
        try{
            setCadastrando(true);
        const resultado = await fetch("https://jsonplaceholder.typicode.com/users",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(novoUsuario)
        });
        if(!resultado.ok){
            throw new Error(`Erro na requisão: ${resultado.status}`);
        }

       const dados = await resultado.json();
       setUsuarios((usuariosAntigos)=>[
        ...usuariosAntigos,dados
       ]);
            setMensagem("Usuário cadastrado com sucesso!");
            setNome("");
            setEmail("");
        
        
        console.log(resultado.status);
        }catch(erro){
                setMensagem(`Erro ao cadastrar Usuário:${erro.message}`);
        }finally{
            setCadastrando(false);
        }
    }

    async function excluirUsuario(id){

        try{
            setExcluindoId(id);
        const resultado = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:"DELETE"
        });

        if(!resultado.ok){
            throw new Error(`Erro na requisição: ${resultado.status}`);
        }

        setUsuarios((usuariosAntigos)=>{
            return usuariosAntigos.filter((usuario)=>{
                return usuario.id !==id
            });

        });
        setMensagem("Usuário excluido com sucesso!");

        console.log("Usuário excluido com sucesso!");
        
    }catch(erro){
        setMensagem(`Erro ao excluir usuario: ${erro.message}`)
    }finally{
        setExcluindoId(null);
    }
    }

    async function atualizarUsuario(id,dadosAtualizados){

        const resultado = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {method:"PUT",
                headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(dadosAtualizados)
            }
        );
        if(!resultado.ok){
                throw new Error(`Erro na requisão: ${resultado.status}`);
            }
        const dados = await resultado.json();
            console.log(dados);

        setUsuarios((usuariosAntigos)=>{
            return usuariosAntigos.map((usuario)=>{
                if(usuario.id === id){
                    return {...usuario,...dados}
                }
                return usuario;
            })
        })
    }
    function iniciandoEdicao(usuario){
        setEditandoId(usuario.id);
        setNomeEditando(usuario.name);
        setEmailEditando(usuario.email);
    }

    async function salvarEdicao(e){
        
        e.preventDefault();
        const dadosAtualizados = {
            name:nomeEditando,
            email:emailEditando
        };
        
        if(nomeEditando.trim() === "" || emailEditando.trim() === ""){
            setMensagem("preencha os campos!");
            return;
        }
        const usuarioOriginal = usuarios.find((usuario)=>{
            return usuario.id === editandoId;
        });
        if(!usuarioOriginal){
            setMensagem("Usuário não encontrado");
            return;
        }
        if(usuarioOriginal.name === nomeEditando && usuarioOriginal.email === emailEditando){
            setMensagem("nenhuma alteração foi realizada!");
            return;
        }
       
try{

    setSalvandoEdicao(true);
        await atualizarUsuario(editandoId,dadosAtualizados);
        setEditandoId(null);
        setMensagem("Usuário atualizado com sucesso!!");
        }catch(erro){
            setMensagem(`Não foi possível atualizar o usuario: ${erro.message}`);
        }finally{
            setSalvandoEdicao(false);
    
        }
    }
    function cancelarEdicao(){
        setEditandoId(null);
    }
     
    return(  <div>
        {editandoId !== null && (<form onSubmit={salvarEdicao}>
            <h3>Editar Usuário</h3>
            <input type="text" value={nomeEditando} onChange={(e)=>{setNomeEditando(e.target.value)}}/>
            <input type="email" value={emailEditando} onChange={(e)=>{setEmailEditando(e.target.value)}}/>
            <button type="submit" disabled={salvandoEdicao}>{salvandoEdicao ? "Salvando ..." : "Salvar"}</button>
            <button type="button" onClick={cancelarEdicao} disabled={salvandoEdicao}>Cancelar</button>
        </form>)}
        <form onSubmit={cadastrarUsuario}>
            <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <button type="submit" disabled={cadastrando}>{cadastrando ? "Cadastrando ...":"Cadastrar Usuário"}</button>
        
        {mensagem && <p>{mensagem}</p>}
        </form>
        {carregando ? (<p>Carregando</p>):(<div>
            {erro && <div><p>{erro}</p><button onClick={buscarUsuarios} disabled={carregando}>{carregando ? 'Tentando novamente...':'Tentar novamente'}</button></div>}
                {!erro && !carregando &&(
                    <div>
                        {usuarios.length === 0 ?(<p>Nenhum usuario</p>):
                        (usuarios.map((usuario)=>(<div key={usuario.id}>
                            <p >{usuario.name}  <button onClick={()=>iniciandoEdicao(usuario)}>Editar</button>
                            <button onClick={()=>excluirUsuario(usuario.id)} disabled={excluindoId !== null}>{excluindoId === usuario.id
                                    ? "Excluindo..."
                                    : "Excluir usuário"}</button></p>
                           
                            </div>
                        )))}
                        </div>
                ) }
        </div>)}
    </div>
)}


export default Usuarios