function FiltroVencimento({filtroPorVencimento,setFiltroPorVencimento}){
    return (
        <select value={filtroPorVencimento} onChange={(e)=>setFiltroPorVencimento(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="atrasadas">Atrasadas</option>
            <option value="hoje">Hoje</option>
            <option value="amanha">Amanhã</option>
            <option value="proximo">Depois de Amanhã</option>
            <option value="proximos7dias">Próximos 7 dias</option>
            <option value="sem-data">Sem data</option>
        </select>
    )

}
export default FiltroVencimento;