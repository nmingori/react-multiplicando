import React, {useState, useEffect} from 'react';
import win1 from './images/win-1.gif';
import win2 from './images/win-2.gif';
import win3 from './images/win-3.gif';
import Keyboard from './keyboard';

const Game = ({tablesToPlay, setTablesToPlay}: any) => {
    const totalSteps = 5; 
    const [actualStep, setActualStep] = useState(1);

    const [leftNum, setLeftNum] = useState<number>(0);
    const [rightNum, setRightNum] = useState<number>(0);
    const [result, setResult] = useState<string>("");
    
    const [resultClass, setResultClass] = useState<string>("");
    const [lockSending, setLockSending] = useState<boolean>(false);

    const [usedProblems, setUsedProblems] = useState<string[]>([]);
    const [forReview, setForReview] = useState<string[]>([]);

    const winImgs = [win1, win2, win3];

    useEffect(() => {
        let lfNum = 0
        let rgNum = 0;
        
        do {            
            lfNum = tablesToPlay[Math.floor(Math.random() * tablesToPlay.length)];
            rgNum = Math.floor(Math.random() * 10) + 1;
        }
        while (usedProblems.includes(`${lfNum}x${rgNum}`))

        setLeftNum(lfNum);
        setRightNum(rgNum); 
        setUsedProblems([...usedProblems, `${lfNum}x${rgNum}`]); 
        setResult("");
        setResultClass("");   
    }, [actualStep]);

    const sendResult = () => {
        if (!lockSending) {
            setLockSending(true);

            if (leftNum * rightNum === parseInt(result)) {
                setResultClass("success");
            } else {
                setResultClass("error");
                setForReview([...forReview, `${leftNum} x ${rightNum} = ${leftNum * rightNum}`])
            }

            setTimeout(() => {
                setActualStep(actualStep + 1);
                setLockSending(false);
            }, 1000);
        }
    }

    const clearResult = () => {
        setResult("");
    }

    const resultKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            sendResult();
        }
    }

    const onlyNumbers = (e: any) => {
        const num = /^[0-9\b]+$/;
        if (e.target.value === '' || num.test(e.target.value)) {
            setResult(e.target.value);
        }
    }

    const hasResults = () => {
        return result.length > 0;
    }

    const addNum = (num: number) => {
        setResult(result + num.toString());
    }

    const newGame = () => {
        setActualStep(1);
        setResult("");
        setResultClass(""); 
        setUsedProblems([]);
        setForReview([]);
    }
    
    const getWinnerGif = () => {
        return winImgs[Math.floor(Math.random() * 3)];
    }

    const goToMenu = () => {
        setTablesToPlay([]);
    }

    return (
        <>
            {(actualStep <= totalSteps) ? (
                <>
                    <p className="stepper">{actualStep} de {totalSteps}</p>
                    <div className="operation">
                        <strong>{leftNum}</strong> x <strong>{rightNum}</strong> =
                        <input type="text" maxLength={2}
                            className={"result " + resultClass} 
                            value={result} 
                            onChange={e => onlyNumbers(e)}
                            onKeyDown={e => resultKeyDown(e)} 
                        />

                        <input type="button" className="btn-send"
                            value=">" 
                            disabled={!hasResults()} 
                            onClick={() => sendResult()} 
                        />
                    </div>

                    <Keyboard addNum={addNum} sendResult={sendResult} 
                        hasResults={hasResults} clearResult={clearResult} />
                </>
            ) : (
                <>
                    {(forReview.length > 0) ? (
                        <div className="for-review">
                            <p className="title">
                                <strong>¡La próxima lo vas a hacer mucho mejor!</strong>
                                <br />Tenes que repasar estas multiplicaciones:
                            </p>
                            <div className="operations-container">
                                {forReview.map(item =>
                                    <p className="operation" key={item}>{item}</p>
                                )}
                            </div>


                        </div>
                    ) : (
                        <div className="win">
                            <span className="title">¡GANASTE!</span>
                            <img className="winner-gif" src={getWinnerGif()} />    
                        </div>
                    )}

                    <input type="button" className="btn-new-game"
                        value="Volver a jugar" 
                        onClick={() => newGame()} 
                    />
                </>
            )}

            <input type="button" className="btn-go-to-menu"
                value="Ir al menú" 
                onClick={() => goToMenu()} 
            />
        </>
    )
}

export default Game;