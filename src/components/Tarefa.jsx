import {useState} from 'react'

function Tarefa({tarefa,onAlternarTarefa,onExcluirTarefa,onEditarTarefa,classeData}){

    const [editando,setEditando] = useState(false);
    const [novoTitulo,setNovoTitulo] = useState(tarefa.titulo);
    const [novaCategoria,setNovaCategoria] = useState(tarefa.categoria);
    const [novaDataVencimento,setNovaDataVencimento]=useState(tarefa.dataVencimento);


function formatarData(tarefa){
    const data = tarefa.dataVencimento;
  if(!data) return "";

  const [ano,mes,dia] = data.split("-");

  const dataVencimento = new Date(ano,mes-1,dia);

  const hoje = new Date();
  hoje.setHours(0,0,0,0);

  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate()+1);
  if(dataVencimento.getTime() === hoje.getTime()) return " 🟠 Hoje";
  if(dataVencimento.getTime() === amanha.getTime()) return "🔵 Amanhã";
  if(dataVencimento.getTime() < hoje.getTime()) return "🔴 Atrasada";

  return `${dia}/${mes}/${ano}`;

}

    function mostrarPrioridade(prioridade){
        switch(prioridade){
            case "alta":
                return "🔴 Alta";
                
            case "media":
                return "🟡 Média";
                
            case "baixa":
                return "🟢 Baixa"    

        }
    }

    function mostrarCategoria(categoria){
        switch(categoria){

            case "geral":
                return "📋 Geral";
            
            case "estudos":
                return "📚 Estudos";

            case "pessoal":
                return "🏠 Pessoal";

            case "trabalho":
                return "💼 Trabalho"
            
        }
    }

    
    return(
    
           <>
               
                {editando ? (<><input type="text" value={novoTitulo} onChange={(e)=>{setNovoTitulo(e.target.value)}}/>
                <input type="date" value={novaDataVencimento} onChange={(e)=>setNovaDataVencimento(e.target.value)}/>
                <select value={novaCategoria} onChange={(e)=>setNovaCategoria(e.target.value)}>
                    <option value="geral">Geral</option>
    <option value="estudos">Estudos</option>
    <option value="trabalho">Trabalho</option>
    <option value="pessoal">Pessoal</option>

                </select>
                 <button onClick={(e)=>{e.stopPropagation(); onEditarTarefa(tarefa.id,novoTitulo,novaCategoria,novaDataVencimento);setEditando(false)}}>
                    Salvar
                    </button>
                    <button onClick={(e)=>{e.stopPropagation(); setEditando(false)}}>
                        Cancelar
                        </button></>)
                :(<div  onClick={()=> onAlternarTarefa(tarefa.id)}>
                 Tarefa: {tarefa.titulo} - {tarefa.concluida === false ? "pendente":"concluida"} 
                  - 
                  {mostrarPrioridade(tarefa.prioridade) } 
                  -
                   {mostrarCategoria( tarefa.categoria)}
                   -
                   <p className={classeData(tarefa)}>
                   {formatarData( tarefa)} - {tarefa.dataVencimento}
                   </p>
                <button onClick={(e)=>{e.stopPropagation();setNovoTitulo(tarefa.titulo);setNovaCategoria(tarefa.categoria);setNovaDataVencimento(tarefa.dataVencimento);setEditando(true)}

            }>Editar</button> 
            <button onClick={(e)=>{e.stopPropagation(); onExcluirTarefa(tarefa.id)}}>
                Excluir</button></div>)   }
                
              
   </> 
    )
}

export default Tarefa