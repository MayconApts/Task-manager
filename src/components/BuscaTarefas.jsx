function BuscaTarefas({busca,setBusca}){

    return(
        <input value={busca} onChange={(e)=>setBusca(e.target.value)} placeholder="Buscar tarefa"/>
    )
}
export default BuscaTarefas