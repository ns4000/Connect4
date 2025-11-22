const PIXI   = require('pixi.js');
import defaults from "./config.js";
import Coin   from "./coin.js";
import Frame  from "./Frame.js";

export  class Game{

  constructor(domNode, optionObj){
    const config = optionObj || defaults;

    this.app = new PIXI.Application({ width: config.width, height: config.height, ...config.renderOption });
    domNode.appendChild(this.app.view);

    // a varilable to keep track which player is current,set to default player 1 = p1
    this.currentPlayer = "p1";
    //a variable to save which player have won
    this.winner ="";
    // gameIsRunning is a varilable to check if the game is running or already finished
    this.gameIsRunning = true ;
    // instance of the Frame found in Frame.js
    this.frame = new Frame();
    // setting the frame interactive and adding an event for mouse cliking, and onClick call function is main trigger for the whole logic
    this.frame.interactive = true;
    // adding the frame to contanier
    this.app.stage.addChild(this.frame);
    // indexArr is gona work as refrence to match the postion of the coins of which CurrentPlayer and help decied the win condetion
    this.indexArr = []
    // calling the init method to init the index and register the event handler
    this.init(this.frame);

  }//end of constructor


  init (frame) {
    //indexArr init with 7 by 6 matrix each cell with player default
    for (let i = 0; i < 6; i++) {
      this.indexArr[i] = []
      for (let n = 0; n <= 6; n++) {
        this.indexArr[i].push({
          Player: null
        })
      }
    };

    // register event handler click event
    frame.on('pointerup', ((event) => {
      this.onClick(event, this);
      }).bind(this));
  }


  // a function to switch between first and second Player
  switchPlayer () {
    if (this.currentPlayer == "p1") {
      this.currentPlayer =  "p2";
    } else{
      this.currentPlayer =  "p1";
    }
  }

  // Show custom modal popup
  showModal(title, message, showPlayAgain = false) {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const popup = document.createElement('div');
    popup.className = 'modal-popup';

    const titleEl = document.createElement('h2');
    titleEl.textContent = title;

    const messageEl = document.createElement('p');
    messageEl.textContent = message;

    popup.appendChild(titleEl);
    popup.appendChild(messageEl);

    if (showPlayAgain) {
      const playAgainBtn = document.createElement('button');
      playAgainBtn.className = 'btn-primary';
      playAgainBtn.textContent = 'Play Again';
      playAgainBtn.onclick = () => {
        overlay.remove();
        this.resetGame();
      };

      const closeBtn = document.createElement('button');
      closeBtn.className = 'btn-secondary';
      closeBtn.textContent = 'Close';
      closeBtn.onclick = () => overlay.remove();

      popup.appendChild(playAgainBtn);
      popup.appendChild(closeBtn);
    } else {
      const okBtn = document.createElement('button');
      okBtn.className = 'btn-primary';
      okBtn.textContent = 'OK';
      okBtn.onclick = () => overlay.remove();
      popup.appendChild(okBtn);
    }

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  // Reset game to initial state
  resetGame() {
    this.app.stage.removeChildren(1);
    this.gameIsRunning = true;
    this.frame.removeAllListeners();
    this.indexArr = [];
    this.init(this.frame);
  }

  // Show win popup when game is won
  alertWin(){
    if(this.currentPlayer == 'p1') {
      this.winner = 'Blue';
      this.showModal('Game Over!', 'Blue Player has won!', true);
    } else {
      this.winner = 'Orange';
      this.showModal('Game Over!', 'Orange Player has won!', true);
    }
    this.gameIsRunning = false;
  };

  // checking whether a cell of the array is empty, if so add a coin with a reference to which player
  checkIndex(col){
    for(let i = 0; i < 6; i++) {  // Fixed: was i <= 6, but only 6 rows (0-5)
      if(this.indexArr[i][col].Player == null){
        this.indexArr[i][col].Player = this.currentPlayer;
        this.winCheck(i, col);
        return i; // this return value determines which row the coin should go to
      }
    }
    return undefined; // Column is full
  };

  // function get adjacent and cellVal and winCheck was inspaierd by coder on the road https://codepen.io/coderontheroad/pen/GdxEo and twiked/fixed to work with my code
  getAdj(row, col, row_inc, col_inc) {
    if (this.cellVal(row, col) == this.cellVal(row + row_inc, col + col_inc)) {
      return 1 + this.getAdj(row + row_inc, col + col_inc, row_inc, col_inc);
    } else {
      return 0;
    }
  };

  cellVal(row, col) {
    if (this.indexArr[row] == undefined || this.indexArr[row][col] == undefined) {
      return -1;
    } else {
      return this.indexArr[row][col]["Player"];
    }
  };
  // winCheck should get the column and row of cell which trigrred the event and check if a horizantal, verticall or diagonal serise of 4 same value of current player occur then its should be a win
  // winCheck check the index of the array and then call and match the adjacent of a cell the event trigrred from call the function cellVal to make sure that the adjacent cell is stil inside the index of the array
  // return an int value and if this value is greater than 2 which mean we have 4 adjacent cell for the same player which trigger the alertWin() function
  winCheck(row, col) {
    if (this.getAdj(row, col, 0, 1) + this.getAdj(row, col, 0, -1) > 2) {
      this.alertWin();
    } else {
      if (this.getAdj(row, col, -1, 0) > 2) {
        this.alertWin();
      } else {
        if (this.getAdj(row, col, -1, 1) + this.getAdj(row, col, 1, -1) > 2) {
          this.alertWin();
          return true;
        } else {
          if (this.getAdj(row, col, 1, 1) + this.getAdj(row, col, -1, -1) > 2) {
            this.alertWin();
            return true;
          } else {
            return false;
          }
        }
      }
    }
  };

  //the color of the coin sprite depend on the currentplayer
  spriteColor(){
    if(this.currentPlayer == 'p1'){
      return "blue";
    }else
      return "orange";
  }

  // click handler on the frame Sprite
  onClick(e){
    // Board dimensions
    const padding = 10;
    const cellSize = 73;
    const cols = 7;
    const rows = 6;

    if(this.gameIsRunning == true){
      let xx = e.data.global.x;

      // Determine which column was clicked
      let col = Math.floor((xx - padding) / cellSize);
      if (col < 0) col = 0;
      if (col >= cols) col = cols - 1;

      // Check if column has space
      let rowIndex = this.checkIndex(col);
      if (rowIndex === undefined) return; // Column is full

      // Create coin and position it
      let newCoin = new Coin(this.spriteColor());
      newCoin.x = padding + col * cellSize + cellSize / 2;
      newCoin.y = padding + (rows - 1 - rowIndex) * cellSize + cellSize / 2;

      this.app.stage.addChild(newCoin);
      this.switchPlayer();
    } else {
      this.showModal('Game Finished', this.winner + ' has won! Play again?', true);
    }
  };
}

let newGame = new Game(document.getElementById('display'));
