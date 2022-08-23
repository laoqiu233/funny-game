import { CSSTransition } from 'react-transition-group';

type ModalProps = {
    children?: React.ReactNode | React.ReactNode[],
    show: boolean,
    onExited?: ()=>void
}

function Modal({children, show, onExited}: ModalProps) {
    return (
        <CSSTransition in={show} classNames='appear' appear timeout={300} unmountOnExit onExited={onExited}>
            <div className='modal'>
                {children}
            </div>
        </CSSTransition>
    );
}

export default Modal;