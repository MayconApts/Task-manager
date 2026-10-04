function LimparFiltros({setFiltro,setFiltroCategoria,setBusca,setOrdenacao}){

    return (
        <button onClick={()=>{setFiltro("todas");setFiltroCategoria("todas");setBusca("");setOrdenacao("prioridade")}}>
            Limpar Filtros 🧹
        </button>
    )
}
export default LimparFiltros;