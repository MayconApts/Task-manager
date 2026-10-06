function LimparFiltros({setFiltro,setFiltroCategoria,setBusca,setOrdenacao,setFiltroPorVencimento}){

    return (
        <button onClick={()=>{setFiltro("todas");setFiltroCategoria("todas");setBusca("");setOrdenacao("prioridade");setFiltroPorVencimento("todas")}}>
            Limpar Filtros 🧹
        </button>
    )
}
export default LimparFiltros;