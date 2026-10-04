function FiltroCategoria({filtroCategoria,setFiltroCategoria}){

return(
    <>
    <select value={filtroCategoria} onChange={(e)=>{setFiltroCategoria(e.target.value)}}>
        <option value="todas">Todas</option>
        <option value="geral">Geral</option>
        <option value="estudos">Estudos</option>
        <option value="trabalho">Trabalho</option>
        <option value="pessoal">Pessoal</option>
    </select>
    </>
)

}
export default FiltroCategoria;