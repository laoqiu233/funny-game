enum CellState {
    Empty,
    O,
    X
}

type CellProps = {
    cellState: CellState,
    index: number,
    clickable: boolean,
    cellClick: (index: number) => void
}

function Cell({cellState, index, cellClick, clickable} : CellProps) {
    const imagesToUse = {
        [CellState.Empty]: <td 
            className={"cell" + (clickable ? " clickable-cell" : "")}
            onClick={() => clickable && cellClick(index)}>Click to place</td>,
        [CellState.O]: <td className="cell o-cell"/>,
        [CellState.X]: <td className="cell x-cell"/>
    }

    return imagesToUse[cellState];
}

type FieldProps = {
    cells: CellState[],
    size: number,
    clickable?: boolean,
    cellClick: (index: number) => void
}

function Field({cells, size, cellClick, clickable = false} : FieldProps) {
    return (
        <table className="field">
            <tbody>
            {
                new Array(size).fill(0).map((v, i) => (
                    <tr key={i}>
                        {cells.slice(i*size, (i+1)*size).map((v, j) => <Cell key={i*size+j} cellState={v} index={i*size + j} cellClick={cellClick} clickable={clickable}/>)}
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export {Field, CellState}