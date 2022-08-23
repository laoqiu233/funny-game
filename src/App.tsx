import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Modal from './Modal';
import { Field, CellState, cellBGClassNames } from './Field';

function LocalGameField() {
    const SIZE = 3;

    const [cells, setCells] = useState<CellState[]>(new Array(9).fill(CellState.Empty));
    const [winner, setWinner] = useState<CellState>(CellState.Empty);
    const [showWinner, setShowWinner] = useState<boolean>(false);

    function cellClick(index: number) {
        const cellToPut = (cells.filter(v => v === CellState.Empty).length % 2 ? CellState.O : CellState.X);

        setCells(cells => {
            return [...cells.slice(0, index), cellToPut, ...cells.slice(index+1)];
        });
    }

    useEffect(() => {
        const emptyCells = cells.filter(v => v === CellState.Empty).length;
        if (emptyCells === 0) {
            setShowWinner(true);
            return;
        }

        for (let i=0; i<SIZE; i++) {
            for (let j=0; j<SIZE; j++) {
                if (cells[i*SIZE + j] === CellState.Empty) continue;

                // Check four possible win directions
                for (let d=0; d<4; d++) {
                    const [di, dj] = [d % 3 - 1, Math.floor(d / 3) - 1];

                    // Check if any cells land outside the boundaries.
                    const [prevI, prevJ] = [i-di, j-dj];
                    const [nextI, nextJ] = [i+di, j+dj];
                    if ([prevI, prevJ, nextI, nextJ].filter(v => v < 0 || v >= SIZE).length) continue;
                    
                    const prevCellState = cells[prevI*SIZE + prevJ];
                    const currCellState = cells[i*SIZE + j];
                    const nextCellState = cells[nextI*SIZE + nextJ];

                    if (prevCellState === currCellState && currCellState === nextCellState) {
                        setWinner(currCellState);
                        setShowWinner(true);
                        console.log(currCellState + ' wins!');
                        console.log((i-di)*SIZE + (j-dj), i*SIZE + j, (i+di)*SIZE + (j+dj), di, dj);
                        return;
                    }
                }
            }
        }
    }, cells);

    return <div style={{position: 'relative'}}>
        <h1>Local Game</h1>
        <Field 
            cells={cells}
            size={3}
            clickable={winner === CellState.Empty}
            cellClick={cellClick}
        />
        
        <Modal show={showWinner}>
            <h1>
                <div 
                    className={winner === CellState.Empty ? 'nobody' : cellBGClassNames[winner]} 
                    style={{margin: 'auto', width: '10em', height: '10em'}}/>
                wins!
            </h1>
            <button onClick={() => {setShowWinner(false); setCells(new Array(9).fill(CellState.Empty));}}>Restart</button>
            <br />
            <Link to='/'><button>Menu</button></Link>
        </Modal>
    </div>;
}

function Menu() {
    return (
        <>
            <h1>Funny Rat Game</h1>
            <Link to='/local'><button>Local Game</button></Link>
            <button disabled>Online Game</button>
        </>
    );
}

function App() {
    return (
        <HashRouter>
            <div className="app">
                <Routes>
                    <Route index element={<Menu/>}/>
                    <Route path='/local' element={<LocalGameField/>}/>
                    <Route path='*' element={(
                        <>
                            <h1>404 rat found</h1>
                            <Link to='/'><button>go back</button></Link>
                        </>
                    )}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
