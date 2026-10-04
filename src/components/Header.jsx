function Header({titulo,descricao,textobotao,onAdicionarTarefa}) {
    return(
<header>
        <h1>
         {titulo}
        </h1>
        <p>
        {descricao}
        </p>
        <button onClick={onAdicionarTarefa}>
            {textobotao}
        </button>
</header>
    )
}

export default Header