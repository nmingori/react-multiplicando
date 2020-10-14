import React from 'react';

const keyNums:number[] = [1,2,3,4,5,6,7,8,9,0];

const Keyboard = ({addNum, sendResult, hasResults, clearResult}: any) => {
    return (
        <div className="keyboard">
            {keyNums.map(num =>
                <input type="button" className="btn-num"
                    key={num} value={num}
                    onClick={() => addNum(num)} 
                />
            )}

            <input type="button" className="btn-clear"
                value="BORRAR" 
                disabled={!hasResults()}
                onClick={() => clearResult()} 
            />

            <input type="button" className="btn-done"
                value="LISTO"
                disabled={!hasResults()}
                onClick={() => sendResult()} 
            />
        </div>
    )
}

export default Keyboard;