import * as React from 'react';
import {useEffect, useState} from 'react';

const Lives = ({playerLives, maxLives}: any) => {

    const [livesToShow, setLivesToShow] = useState<boolean[]>([]);

    useEffect(() => {
        let lives = [];
        for (var i = 0; i < maxLives; i++) {
            lives.push(i < playerLives);
        }
        setLivesToShow(lives)
    }, [maxLives, playerLives]);

    return (
        <div className="d-flex justify-content-center mb-4">
            <strong className="mr-1">Vidas:</strong>

            {livesToShow.map((live, i) => (
                <span key={i}>
                    {(live === true) ? (
                        <span>&#x2764;&#xFE0F;</span>
                    ) : (
                        <span style={{opacity:'.5'}}>&#x1F5A4;</span>
                    )}
                </span>
            ))}
        </div>
    )
}

export default Lives;