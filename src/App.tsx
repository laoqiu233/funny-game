import { useState } from 'react';
import './App.css';

const SIZE = 3;

enum CellState {
    Empty,
    O,
    X
}

type Field = {
    cells: CellState[]
}

type CellProps = {
    cellState: CellState,
    index: number,
    cellClick: (index: number) => void
}

function Cell({cellState, index, cellClick} : CellProps) {
    const imagesToUse = {
        [CellState.Empty]: <td className="cell empty-cell" onClick={() => cellClick(index)}>Click to place</td>,
        [CellState.O]: <td className="cell o-cell"/>,
        [CellState.X]: <td className="cell x-cell"/>
    }

    return imagesToUse[cellState];
}

function Field() {
    const [cells, setCells] = useState(new Array(9).fill(CellState.Empty));

    function cellClick(index: number) {
        const unfilledCells = cells.filter(x => x == CellState.Empty).length;
        
        const changeTo = (unfilledCells % 2 ? CellState.O : CellState.X);

        setCells(currentCells => {
            return [...currentCells.slice(0, index), changeTo, ...currentCells.slice(index+1)];
        });

        // TODO:game win logic
    }

    return (
        <table className="field">
            {
                new Array(SIZE).fill(0).map((v, i) => (
                    <tr key={i}>
                        {cells.slice(i*SIZE, (i+1)*SIZE).map((v, j) => <Cell cellState={v} index={i*SIZE + j} cellClick={cellClick}/>)}
                    </tr>
                ))
            }
        </table>
    );
}

function App() {
    return (
        <div className="app">
            <h1>Mouse Game</h1>
            <Field/>
        </div>
    )
}

export default App;
