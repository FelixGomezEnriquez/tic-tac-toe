import { useState } from 'react';
import Square from './Square';
import confetti from "canvas-confetti";

const Board=()=>{
const TURNS={
  X:'x',
  O:'o'
};
 const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const [board,setBoard]= useState(Array(9).fill(null));

  const [turn,setTurn]= useState(TURNS.X);
  const [winner,setWinner]= useState(null); //null no hay ganador ,false hay un empate 

  const checkWinner=(boardToCheck)=>{
    console.log(boardToCheck)
    // revisamos todas las combinaciones ganadoras
  // para ver si X u O ganó
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
      
    };
const checkEndGame = (boardToCheck)=>{
    return boardToCheck.every((square)=> square!==null);
};
const resetGame=()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
};

  const updateBoard=(index)=>{

    // No actualizamos si hay algo en la posicion 
    if(board[index] || winner) return;
    //actualizar tablero
    const newBoard=[...board];
    newBoard[index] = turn;
    // actualizar turno 
    setBoard(newBoard);
    const newTurn= turn==TURNS.X ? TURNS.O: TURNS.X;
    setTurn(newTurn);
  // Comprobar ganador
    const newWinner=checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner);
      confetti();
    }else if(checkEndGame(newBoard)){
        setWinner(false);
    }

  }


  return (
    <main className='board'>
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}> Resetear el juego</button>
    <section className='game'>
      {
        board.map((cell,index)=>{
          return(
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {cell}
            </Square>
          )
        })
      }
      
    </section>
<section className='turn'>
      <Square isSelected={turn==TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn==TURNS.O} >{TURNS.O}</Square>

      </section>
    {
        winner !== null &&(
            <section className='winner'>
            <div className='text'>
                <h2>
                    {
                        winner==false ?'Empate' : 'Ganó:' 
                                            }
                </h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>

            </section>
        )
    }
    
    </main>

    
  )

}

export default Board;