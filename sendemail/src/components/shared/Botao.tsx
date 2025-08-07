interface BotaoProps {
    id?: string
    className?: string
    children?: any
    executar?: () => void
}
export default function Botao(props: BotaoProps){
    return(
        <button id={props.id} className={`${props.className} font-bold`} onClick={props.executar}>
            {props.children}
        </button>
    )
}