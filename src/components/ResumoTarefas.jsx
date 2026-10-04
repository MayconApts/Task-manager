
function ResumoTarefas({quantidadeTotal,quantidadePendentes,quantidadeConcluidas,percentualConclusao}){


return(
    <>
        <p>Total: {quantidadeTotal}</p>
        <p>Pendentes: {quantidadePendentes}</p>
        <p>Concluídas: {quantidadeConcluidas}</p>
        <p>Progresso: {percentualConclusao}%</p>
        <div className="barra-progresso">
            <div className="barra-progresso-preenchida" style={{width:`${percentualConclusao}%`}}>

            </div>
        </div>
    </>
)


}
export default ResumoTarefas;
