import { useEffect, useState } from 'react';
import './App.css';
import { Field, CellState } from './Field';

function LocalGameField() {
    const SIZE = 3;

    const [cells, setCells] = useState<CellState[]>(new Array(9).fill(CellState.Empty));
    const [winner, setWinner] = useState<CellState>(CellState.Empty);

    function cellClick(index: number) {
        const emptyCellsCount = cells.filter(v => v === CellState.Empty).length;
        const cellToPut = (emptyCellsCount % 2 ? CellState.O : CellState.X);

        setCells(cells => {
            return [...cells.slice(0, index), cellToPut, ...cells.slice(index+1)];
        });
    }

    useEffect(() => {
        for (let i=0; i<SIZE; i++) {
            for (let j=0; j<SIZE; j++) {
                if (cells[i*SIZE + j] === CellState.Empty) continue;

                for (let d=0; d<4; d++) {
                    const [di, dj] = [d % 3 - 1, Math.floor(d / 3) - 1];
                    
                    const prevCellState = cells[(i-di)*SIZE + (j-dj)];
                    const currCellState = cells[i*SIZE + j];
                    const nextCellState = cells[(i+di)*SIZE + (j+dj)];

                    if (prevCellState === currCellState && currCellState === nextCellState) {
                        setWinner(currCellState);
                        console.log(currCellState + ' wins!');
                        return;
                    }
                }
            }
        }
    }, cells);

    return <Field cells={cells} size={3} clickable={winner === CellState.Empty} cellClick={cellClick}/>
}

function App() {
    return (
        <div className="app">
            <h1>Mouse Game</h1>
            <LocalGameField/>
        </div>
    )
}

export default App;
