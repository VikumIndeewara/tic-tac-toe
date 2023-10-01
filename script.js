

function Gameboard(){
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i][j] = 0;
        }
    }

    const setBoxvalue = (i,j,value) => {
      board[i][j] = value;
    };

    const getBoard = (i,j) => board[i][j];

    const resetBoard = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          board[i][j] = 0;
        }
      }
    };


    return { getBoard, setBoxvalue,resetBoard};

}

  function GameController(playerOneName = "Player One",playerTwoName = "Player Two"){



    const board = Gameboard();

    let gameOver = false;
  
    const players = [
      {
        name: playerOneName,
        marker: "X"
      },
      {
        name: playerTwoName,
        marker:"O"
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      displayPlayerTurn();
      
    };
    const displayPlayerTurn = () => {
      playerTurn.textContent = `${activePlayer.name} 's Turn...`
    }
    
    const playerTurn = document.getElementById("playerTurn");
    const firstPage = document.getElementById("firstPage");
    const ingameScreen = document.getElementById("ingameScreen");
    const gameBoxes = document.querySelectorAll(".gameBox");
    const playbtn = document.getElementById("pvp");
    const restartBtn = document.getElementById("restart");

    restartBtn.addEventListener("click",restartGame);
    playbtn.addEventListener("click", startGame);
   

    function startGame(){
      firstPage.classList.toggle("hide")
      ingameScreen.classList.toggle("hide")
      displayPlayerTurn();
      gameBoxes.forEach(box => {
        box.addEventListener("click",putPlayerMarker)
    });

    }
    function putPlayerMarker(){
      if(gameOver){
        return;
      }
      const x = +this.dataset.x;
      const y = +this.dataset.y;
      let value = board.getBoard(x,y);
      const div = document.createElement("div");
      div.classList.add("marker");
      
      if (value == "0"){
        if(activePlayer == players[0]){
          value = "X";
          div.textContent = "X";
          this.appendChild(div);
          board.setBoxvalue(x,y,value);

        }else if(activePlayer == players[1]){
          value = "O";
          div.textContent = "O";
          this.appendChild(div);
          board.setBoxvalue(x,y,value);
        }

        checkWinner();
        switchPlayerTurn();
       

      }
    }

    function checkWinner(){

      for(let i = 0; i < 3; i++){
      if (board.getBoard(i,0) === board.getBoard(i,1) && board.getBoard(i,1) === board.getBoard(i,2) && board.getBoard(i,0) != 0){
        displayWinner();
      }else if (board.getBoard(0,i) === board.getBoard(1,i) && board.getBoard(1,i) === board.getBoard(2,i) && board.getBoard(0,i) != 0){
        displayWinner();
      }else if (board.getBoard(0,0) === board.getBoard(1,1) && board.getBoard(1,1) === board.getBoard(2,2) && board.getBoard(0,0) != 0 || board.getBoard(0,2) === board.getBoard(1,1) && board.getBoard(1,1) === board.getBoard(2,0) && board.getBoard(2,0) != 0){
        displayWinner();
      }
    };
    
    function displayWinner(){
      const winnerWindow = document.getElementById("winner");
      winnerWindow.classList.toggle("hide");
      playerTurn.classList.add("hide");
      winnerWindow.textContent = `Winner is ${activePlayer.name}`;
      gameOver = true;
      return;
    }
    }
    
    function restartGame(){
      gameOver = false;

      board.resetBoard();

      const gameBoxes = document.querySelectorAll(".gameBox");
      gameBoxes.forEach(box => {
        box.textContent = '';
        box.dataset.value = '0';
      });

      activePlayer = players[0];
    
      firstPage.classList.toggle("hide")
      ingameScreen.classList.toggle("hide")
      const winnerWindow = document.getElementById("winner");
      winnerWindow.classList.add("hide");
      playerTurn.classList.remove("hide");
  
    
    }
  }

  const game = GameController();