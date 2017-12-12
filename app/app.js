const PIXI   = require('pixi.js');
import config from "./Config.js";
import Coin   from "./Coin.js";
import Frame  from "./Frame.js";

export  class game{

  constructor(config){
    this.app = new PIXI.Application(config.width,config.height,config.renderOption);
    document.getElementById('display').appendChild(this.app.view);

    // a varilable to keep track which player is current,set to default player 1 = p1
    this.currentPlayer = "p1";
    //a variable to save which player have won
    this.winner ="";
    // gameIsRunning is a varilable to check if the game is running or already finished
    this.gameIsRunning = true ;
    // instance of the Frame Sprite found in Frame.js
    this.frame = new Frame();
    this.frame.scale.set(0.71);
    // setting the frame interactive and adding an event for mouse cliking, and onClick call function is main trigger for the whole logic
    this.frame.interactive = true;
    // adding the frame to contanier
    this.app.stage.addChild(this.frame);

    // indexArr is gona work as refrence to match the postion of the coins of which CurrentPlayer and help decied the win condetion
     this.indexArr = []


    this.init(this.frame);

  }//end of constructor


  init (frame) {
    this.indexArr.length= 0;
    //indexArr init with 7 by 6 matrix each cell with player default
    for (var i = 0; i < 6; i++) {
      this.indexArr[i] = []
      for (var n = 0; n <= 6; n++) {
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

  // a simple alert function triggerd when the game is won by one of the players
  alertWin(){
    if(this.currentPlayer == 'p1')
      {
        this.winner = 'Blue';
        alert("Blue Player have won");
      }else{
        this.winner ='Orange'
        alert("Orange Player have won");
      }
    this.gameIsRunning = false;
   };

  // checking wheather a cell of the array is empty,if so add a coin with a refrence to which player
  checkIndex(col){
    for(let i = 0; i<= 6;i++) {
      if(this.indexArr[i][col].Player == null){
        this.indexArr[i][col].Player = this.currentPlayer;
        this.winCheck(i,col);
        return i;// this return value is to determin which row the coin should go to
      }
    }
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

  spriteColor(){
    if(this.currentPlayer == 'p1'){
      return "blue";
    }else
      return "orange";
  }

  // click handler on the frame Sprite
  onClick(e){

    if(this.gameIsRunning == true){
    //a function to check which player did make the click and which Sprite should be created

    // creat an instance of sprite depending on which player is on right now
    let newCoin = new Coin(this.spriteColor());

    // check which colume the click event happend with, if x is smaller than 80px then its the first column and so on
    let xx = e.data.global.x;

    if(xx<80){

        newCoin.x = 8;
        newCoin.y = 364-(this.checkIndex(0)*71); // after checking the index assign y value accordenling
         this.switchPlayer();
      }else if(xx<150){
        newCoin.x = 79;
        newCoin.y = 364-(this.checkIndex(1)*71);
        this.switchPlayer();
      }else if(xx<220){
        newCoin.x = 151;
        newCoin.y = 364-(this.checkIndex(2)*71);
        this.switchPlayer();
      }else if(xx<290){
        newCoin.x = 221;
        newCoin.y = 364-(this.checkIndex(3)*71);
        this.switchPlayer();
      }else if(xx<370){
        newCoin.x = 293;
        newCoin.y = 364-(this.checkIndex(4)*71);
        this.switchPlayer();
      }else if(xx<430){
        newCoin.x = 363;
        newCoin.y = 364-(this.checkIndex(5)*71);
        this.switchPlayer();
      }else if(xx<550){
        newCoin.x = 434;
        newCoin.y = 364-(this.checkIndex(6)*71);
        this.switchPlayer();
      }
    // add the instance of the sprite
       this.app.stage.addChild(newCoin);
    }else{ // if the game is already finished alert the player of it
      let message = confirm('The game have finshed '+ this.winner +' have won, Start a new game?');
      if(message == true){
        // this.app.stage.removeChildren(1);
        // this.gameIsRunning = true;
        // this.indexArr = [];
        // this.init(this.frame,this.indexArr);
        // need to rest the array and reRender the frame and coin sprite
        alert("Coming soon in the next version :D")
      }

    }
  };

};

let newGame = new game(config);
