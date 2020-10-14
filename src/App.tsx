import React, {useState, useEffect} from 'react';
import GameMenu from './components/game-menu';
import Game from './components/game';

const App = () => {

    const [tablesToPlay, setTablesToPlay] = useState<number[]>([]);

    const readyToPlay = () => {
        return tablesToPlay.length > 0;
    }

    return (
        <div className="game-container">
            <h1 className="game-name">Multiplicando</h1>

            {!readyToPlay() && <GameMenu setTablesToPlay={setTablesToPlay} />}

            {readyToPlay() && <Game tablesToPlay={tablesToPlay} setTablesToPlay={setTablesToPlay} />}
        </div>
    )
}

export default App;