function FiltroVencimento({filtroPorVencimento,setFiltroPorVencimento}){
    return (
        <select value={filtroPorVencimento} onChange={(e)=>setFiltroPorVencimento(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="atrasadas">Atrasadas</option>
            <option value="hoje">Hoje</option>
            <option value="amanha">Amanhã</option>

        </select>
    )

}
export default FiltroVencimento;