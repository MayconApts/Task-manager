function FiltrosTarefas({filtro,setFiltro}){

return(<>
<button onClick={()=>setFiltro("todas") } className={filtro === "todas"?"ativo":""}  >
{filtro === "todas" ? "Todas ✅":"Todas"}
</button>
<button onClick={()=>setFiltro("pendentes")} className={filtro==="pendentes"?"ativo":""}>
    {filtro === "pendentes"?"Pendentes ✅":"Pendentes"}

</button>
<button onClick={()=>{setFiltro("concluidas")} } className={filtro === "concluidas"?"ativo":""}>
    {filtro === "concluidas" ? "Concluidas ✅":"Concluidas"}

</button>
</>
)
}
export default FiltrosTarefas;