import React, {useState, useEffect} from 'react';

const GameMenu = ({setTablesToPlay}: any) => {

    const tables:number[] = [1,2,3,4,5,6,7,8,9];
    const [selectedTables, setSelectedTables] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
   
    const selectTable = (table:number) => {
        let selTables = [...selectedTables];
        let index = selTables.indexOf(table);

        if (index === -1) {
            selTables.push(table);
        } else {
            selTables.splice(index, 1);
        }

        setSelectedTables(selTables);
    }

    const selectAllTables = (e:any) => {
        let checked = e.target.checked;
        if (checked) {
            setSelectedTables(tables);
            setAllSelected(true);
        } else {
            setSelectedTables([]);
        }
        setAllSelected(checked);
    }

    const startGame = () => {
        if (selectedTables.length > 0) {
            setTablesToPlay(selectedTables);
        }
    }

    const hasTable = (table:number) => {
        return selectedTables.indexOf(table) != -1;
    }

    return (
        <>
            <p className="text-menu">Eligí las tablas con que queres jugar:</p>
            <ul className="select-tables">
                {tables.map(table => 
                    <li className={allSelected ? "disabled-num" : ""}  key={table}>
                        <input type="checkbox" 
                            value={table} 
                            onChange={() => selectTable(table)} 
                            disabled={allSelected}
                            checked={hasTable(table)}
                        />
                        <label>{table}</label>
                    </li>
                )}

                <li>
                    <input type="checkbox" 
                        onChange={e => selectAllTables(e)} 
                        checked={allSelected}
                    />
                    <label>Todas! 💪</label>
                </li>
            </ul>

            

            <input type="button" className="btn-start-game"
                value="A jugar!" 
                disabled={(selectedTables.length == 0)}
                onClick={() => startGame()} 
                
            />
        </>
    )
}

export default GameMenu;