import { createContext, useEffect, useState } from 'react';
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
        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <h1>Local Game</h1>
            <Link to='/'><button>Back to menu</button></Link>
        </div>
        
        <Field 
            cells={cells}
            size={3}
            clickable={winner === CellState.Empty}
            cellClick={cellClick}
        />
        
        <Modal show={showWinner} onExited={() => setWinner(CellState.Empty)}>
            <h1>
                <div 
                    className={winner === CellState.Empty ? 'nobody' : cellBGClassNames[winner]} 
                    style={{margin: '0px auto 20px auto', width: '10em', height: '10em'}}/>
                wins!
            </h1>
            <button onClick={() => {setShowWinner(false); setCells(new Array(9).fill(CellState.Empty));}}>Restart</button>
            <br />
            <Link to='/'><button>Menu</button></Link>
        </Modal>
    </div>;
}

function OnlineLobby({ setUsername } : {setUsername: (v:string) => void}) {
    const [usernameTyped, setUsernameTyped] = useState('');

    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

    return (
        <UserContext.Consumer>
            {
                user => (
                    <>
                        <h1>Online lobby | {user || 'Not logged in'}</h1>
                        <Modal show={user===''}>
                            <h1>Please login first</h1>
                            <input className='text-center' type="text" placeholder='Your name' value={usernameTyped} onChange={(e) => setUsernameTyped(e.target.value)} />
                            <br />
                            {usernameRegex.test(usernameTyped) || <p style={{marginTop: '-10px'}}>Your username should only consist of latin letters, numbers, and contain 3 or more characters</p>}
                            <button onClick={() => setUsername}>Let&apos;s go</button>
                            <Link to='/'><button>nah take me back</button></Link>
                        </Modal>
                    </>
                )
            }
        </UserContext.Consumer>
    );
}

function Menu() {
    return (
        <>
            <h1>Funny Rat Game</h1>
            <Link to='/local'><button>Local Game</button></Link>
            <Link to='/online'><button>Online Game</button></Link>
        </>
    );
}

const UserContext = createContext('');

function App() {
    const [username, setUsername] = useState<string>('');
    
    return (
        <UserContext.Provider value={username}>
            <HashRouter>
                <div className="app">
                    <Routes>
                        <Route index element={<Menu/>}/>
                        <Route path='/local' element={<LocalGameField/>}/>
                        <Route path='/online' element={<OnlineLobby setUsername={setUsername}/>}></Route>
                        <Route path='*' element={(
                            <>
                                <h1>404 rat found</h1>
                                <Link to='/'><button>go back</button></Link>
                            </>
                        )}/>
                    </Routes>
                </div>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;
