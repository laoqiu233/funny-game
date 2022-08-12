import { useState } from 'react';
import './App.css';

enum CellState {
    Empty,
    O,
    X
}

type Field = {
    cells: CellState[]
}

type CellProps = {
    cellState: CellState
}

function Cell({cellState} : CellProps) {
    const imagesToUse = {
        [CellState.Empty]: <div className="cell empty-cell"/>,
        [CellState.O]: <div className="cell o-cell"/>,
        [CellState.X]: <div className="cell x-cell"/>
    }

    return imagesToUse[cellState];
}

function Field() {
    const [cells, setCells] = useState(new Array(9).fill(CellState.X))

    return (
        <div className="field">
            {
                cells.map((cellState, i) => <Cell key={i} cellState={cellState}/>)
            }
        </div>
    );
}

function App() {
    return (
        <div className="app">
            <Field/>
        </div>
    )
}

export default App;
