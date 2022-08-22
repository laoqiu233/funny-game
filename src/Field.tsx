enum CellState {
    Empty,
    O,
    X
}

const cellBGClassNames = {
    [CellState.Empty]: 'clickable-cell',
    [CellState.O]: 'o-cell',
    [CellState.X]: 'x-cell' 
}

type CellProps = {
    cellState: CellState,
    index: number,
    clickable?: boolean,
    cellClick?: (index: number) => void
}

function Cell({cellState, index, cellClick=v=>null, clickable=false} : CellProps) {
    return <td
        className={"cell " + cellBGClassNames[cellState]}
        onClick={() => clickable && cellState === CellState.Empty && cellClick(index)}
    >{clickable && 'Click to place'}</td>
}

type FieldProps = {
    cells: CellState[],
    size: number,
    clickable?: boolean,
    cellClick: (index: number) => void
}

function Field({cells, size, cellClick, clickable = false} : FieldProps) {
    return (
        <table className='field'>
            <tbody>
            {
                new Array(size).fill(0).map((v, i) => (
                    <tr key={i}>
                        {cells.slice(i*size, (i+1)*size).map((v, j) => <Cell key={i*size+j} cellState={v} index={i*size + j} cellClick={cellClick} clickable={v === CellState.Empty}/>)}
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export {Field, CellState, cellBGClassNames}