function OrdenacaoTarefas({ordenacao,setOrdenacao}){

    return(
        <>

        <select value={ordenacao} onChange={(e)=>setOrdenacao(e.target.value)}>
            <option value="prioridade">Prioridade</option>
            <option value="recentes">Recentes</option>
            <option value="antigas">Antigas</option>
        </select>
        </>
    )
}
export default OrdenacaoTarefas