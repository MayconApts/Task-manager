
import './App.css'
import Header from './components/Header'
import { useState,useEffect } from 'react'
import Tarefa from './components/Tarefa'
import ResumoTarefas from './components/ResumoTarefas'
import FiltroTarefas from './components/FiltrosTarefas'
import FiltroCategoria from './components/FiltroCategoria'
import OrdenacaoTarefas from './components/OrdenacaoTarefas'
import BuscaTarefas from './components/BuscaTarefas'
import LimparFiltros from './components/LimparFiltros'
import FiltroVencimento from './components/FiltroVencimento'



function App() {
 const [tarefas,setTarefas] = useState(()=>{
  const tarefasSalvas = localStorage.getItem("tarefas");
  if(tarefasSalvas){
    return JSON.parse(tarefasSalvas);
  }
  return []
 });
const [titulo,setTitulo] = useState("");
const [filtro,setFiltro] = useState("todas");
const [prioridade,setPrioridade]= useState("media");
const [categoria,setCategoria] = useState("geral");
const [filtroCategoria,setFiltroCategoria] = useState("todas");
const [ordenacao,setOrdenacao]=useState("prioridade");
const [busca,setBusca] = useState("");
const [dataVencimento,setDataVencimento] = useState("");
const [filtroPorVencimento,setFiltroPorVencimento] = useState("todas");

useEffect(()=>{
localStorage.setItem("tarefas",JSON.stringify(tarefas));
},[tarefas]);



function adicionarTarefa(){
  localStorage.setItem("teste",JSON.stringify(tarefas));
 if(titulo.trim() === ""){
  alert("Digite um titulo para a tarefa");
  return;
 }
  setTarefas([...tarefas,{
    id: Date.now(),
    titulo: titulo.trim(),
    concluida: false,
    prioridade,
    categoria,
    dataVencimento
  }

  ]);
  setTitulo("");  
  setDataVencimento("");
 
}

function alternarTarefa(id){
const novaLista = tarefas.map((item)=>{
  if(item.id === id){
    return {...item, 
      concluida: !item.concluida
    }
  }
  return item;
})
setTarefas(novaLista);
}

function excluirTarefa(id){

  const confirmar = confirm("Tem certeza?");
  
  if(confirmar){
  const novaLista = tarefas.filter((item)=>{
  return id !== item.id
  }

  )
  
  setTarefas(novaLista);
  }
}



function contarTarefas(tipo){
  if(tipo === "pendentes"){
    return tarefas.filter((item)=>{
      return !item.concluida
    }).length
  }else if(tipo === "concluidas"){
  return tarefas.filter((item)=>{
    return item.concluida
  }).length}
  return 0;
}


function calcularPercentualConclusao(){
  if(quantidadeTotal !== 0){
    return quantidadeConcluidas/quantidadeTotal*100;
  }
  return 0
}

const quantidadePendentes = contarTarefas("pendentes");
const quantidadeConcluidas = contarTarefas("concluidas");

function editarTarefa(id,titulo,categoria,dataVencimento){
  const novaLista = tarefas.map((item)=>{
    if(item.id === id){
      return{
        ...item,
        titulo,
        categoria,
        dataVencimento
      }
      
    }
    return item
    
  })

  setTarefas(novaLista);
}



function filtrarTarefas(){
  let tarefasFiltradas = tarefas;
  if(filtro === "pendentes"){
    return tarefasFiltradas.filter((item)=>{
      return !item.concluida
    });
  }else if(filtro === "concluidas"){
  return tarefasFiltradas.filter((item)=>{
    return item.concluida
  })
  }
  return tarefasFiltradas;
}

const tarefasFiltradas = filtrarTarefas();




function filtrarPorCategoria(tarefasParaFiltrar){
  if (filtroCategoria !== "todas"){
    return tarefasParaFiltrar.filter((item)=>{
      return item.categoria === filtroCategoria;
    });
  }
  return tarefasParaFiltrar;
}

const tarefasPorCategoria = filtrarPorCategoria(tarefasFiltradas);


const quantidadeTotal = tarefas.length;
const tarefasOrdenadas = ordenarTarefas(tarefasPorCategoria);

function pesoPrioridade(prioridade){

  switch(prioridade){
    case "alta":
      return 1;
    case "media":
      return 2;
    case "baixa":
      return 3;
  }

}
function ordenarTarefas(tarefasParaOrdenar){

  if(ordenacao === "recentes"){

    tarefasParaOrdenar.sort((a,b)=>{
      return b.id - a.id;
    });

  } else if(ordenacao === "antigas"){
    tarefasParaOrdenar.sort((a,b)=>{
      return a.id - b.id;
    });
  }else if(ordenacao === "prioridade"){
    tarefasParaOrdenar.sort((a,b)=>{
      return pesoPrioridade(a.prioridade)- pesoPrioridade(b.prioridade);
    })
  }

  return tarefasParaOrdenar;
}


function buscarTarefas(tarefasParaBuscar){
  if(busca !== ""){
    return tarefasParaBuscar.filter((item)=>{
      return item.titulo.toLowerCase().includes(busca.toLowerCase());
    })
  }
  return tarefasParaBuscar;
}
function classeData(tarefa){

        if(tarefa.concluida) return "data-concluida";
        const data = tarefa.dataVencimento;

        

        if(!data) return "";
        const [ano,mes,dia] = data.split("-");

        const dataVencimento = new Date(ano,mes-1,dia);
        const hoje = new Date();
        hoje.setHours(0,0,0,0);

        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate()+1);

        

        if(dataVencimento.getTime() === hoje.getTime()) return "data-hoje";
        if(dataVencimento.getTime() === amanha.getTime()) return "data-amanha";
        if(dataVencimento.getTime() < hoje.getTime()) return "data-atrasada";
        return "data-normal"
    }

const tarefasBusca = buscarTarefas(tarefasOrdenadas);


const percentualConclusao = calcularPercentualConclusao();

  return (

    <>
    <input type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
    
    <select value={prioridade} onChange={(e)=>{setPrioridade(e.target.value)}}>
      
      <option value="media">Média</option>
      <option value="baixa">Baixa</option>
      <option value="alta">Alta</option>
    </select>

    <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
    <option value="geral">Geral</option>
    <option value="estudos">Estudos</option>
    <option value="trabalho">Trabalho</option>
    <option value="pessoal">Pessoal</option>
    </select>
    <input type="date" value={dataVencimento} onChange={(e)=>setDataVencimento(e.target.value)}/>
  <Header 
  titulo="Gerenciador de tarefas" 
  descricao="Bem vindo ao meu gerenciador de tarefas. Organize suas tarefas de forma eficiente."
   textobotao="Nova tarefa"
   onAdicionarTarefa={adicionarTarefa}/>

      
  <ResumoTarefas percentualConclusao={percentualConclusao}    quantidadePendentes={quantidadePendentes} quantidadeConcluidas={quantidadeConcluidas} quantidadeTotal={quantidadeTotal}/>
   <div className='barra-progresso'>
    <div className='barra-progresso-preenchida' style={{width:`${percentualConclusao}%`}}></div>
   </div>
   <FiltroTarefas filtro={filtro} setFiltro={setFiltro}/>
   <FiltroCategoria filtroCategoria={filtroCategoria} setFiltroCategoria={setFiltroCategoria}/>
   <OrdenacaoTarefas ordenacao={ordenacao} setOrdenacao={setOrdenacao}/>
   <BuscaTarefas busca={busca} setBusca={setBusca}/>
   <FiltroVencimento filtroPorVencimento={filtroPorVencimento} setFiltroPorVencimento={setFiltroPorVencimento}/>
   <LimparFiltros setFiltro={setFiltro} setFiltroCategoria={setFiltroCategoria} setBusca={setBusca} setOrdenacao={setOrdenacao}/>
   {tarefasBusca.length === 0 ?(<p>Nenhuma tarefa encontrada</p>):<>{tarefasBusca.map((item)=>{
    return <Tarefa key={item.id} onAlternarTarefa={alternarTarefa}  classeData={classeData} onEditarTarefa={editarTarefa} onExcluirTarefa={excluirTarefa} tarefa={item} />})}
  </>}
   
 </> 
 
)
}

export default App
