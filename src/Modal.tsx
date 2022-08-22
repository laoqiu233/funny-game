type ModalProps = {
    children?: React.ReactNode | React.ReactNode[]
    text: string,
    buttonText: string,
    filled?: boolean,
    onClick?: () => void
}

function Modal({children, buttonText, filled=false, onClick=()=>null}: ModalProps) {
    return <div className={"modal" + (filled ? " filled" : "")}>
        {children}
        <button onClick={onClick}>{buttonText}</button>
    </div>
}

export default Modal;