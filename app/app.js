const PIXI   = require('pixi.js');
import config from "./Config.js";
import Coin from "./Coin.js";

export  class game{
  constructor(){

    this.init(config);
  }

  init(config){

    const app = new PIXI.Application(config.width,config.height,config.renderOption);
    document.getElementById('display').appendChild(app.view);
    // a varilable to keep track which player is current,set to default player 1 = p1
    let CurrentPlayer = "p1";
    //a variable to save which player have won
    let winner ="";
    // gameIsRunning is a varilable to check if the game is running or already finished
    let gameIsRunning = 1 ;

    // Frame is the Sprite of the background
    const frame = PIXI.Sprite.fromImage('images/fial_board.png');
    frame.scale.set(0.71);
    // adding the frame to contanier
    app.stage.addChild(frame);
    // setting the frame interactive and adding an event for mouse cliking, and onClick call function is main trigger for the whole logic
    frame.interactive = true;
    frame.on('pointerup',onClick);

    // indexArr is gona work as refrence to match the postion of the coins of which CurrentPlayer and help decied the win condetion
    var indexArr = []
    for (var i = 0; i < 6; i++) {
      indexArr[i] = []
      for (var n = 0; n <= 6; n++) {
        indexArr[i].push({
          Player: null
        })
      }
    };

    // a function to switch between first and second Player
    function switchPlayer(){
      if (CurrentPlayer == "p1")
          CurrentPlayer =  "p2";
      else
          CurrentPlayer =  "p1";
    };


  // checking wheather a cell of the array is empty,if so add a coin with a refrence to which player
  function checkIndex(col){
    for(let i = 0; i<= 6;i++)
      if(indexArr[i][col].Player == null){
         indexArr[i][col].Player = CurrentPlayer;
         winCheck(i,col);
         return i;// this return value is to determin which row the coin should go to
    }
  };

    // a simple alert function triggerd when the game is won by one of the players
    function alertWin(){
      if(CurrentPlayer == 'p1')
      {
        winner = 'blue';
        alert("Blue Player have won");

      }else{
        winner ='Orange'
        alert("Orange Player have won");
      }
      // alert(CurrentPlayer +' have won');
      gameIsRunning = 0;
    };

    // function get adjacent and cellVal and winCheck was inspaierd by coder on the road https://codepen.io/coderontheroad/pen/GdxEo and twiked/fixed to work with my code
    function getAdj(row,col,row_inc,col_inc){
      if(cellVal(row,col) == cellVal(row+row_inc,col+col_inc)){
        return  1+getAdj(row+row_inc,col+col_inc,row_inc,col_inc);
      } else {
        return 0;
      }
    };

    function cellVal(row,col){
        if(indexArr[row] == undefined || indexArr[row][col] == undefined){
        return -1;
      } else {
        return indexArr[row][col]["Player"];
      }
    };


  // winCheck should get the column and row of cell which trigrred the event and check if a horizantal, verticall or diagonal serise of 4 same value of current player occur then its should be a win
  // winCheck check the index of the array and then call and match the adjacent of a cell the event trigrred from call the function cellVal to make sure that the adjacent cell is stil inside the index of the array
  // return an int value and if this value is greater than 2 which mean we have 4 adjacent cell for the same player which trigger the alertWin() function
  function winCheck(row,col){
      if(getAdj(row,col,0,1)+getAdj(row,col,0,-1) > 2){
      alertWin();
    } else {
      if(getAdj(row,col,-1,0) > 2){
        alertWin();
      } else {
        if(getAdj(row,col,-1,1)+getAdj(row,col,1,-1) > 2){
          alertWin();
          return true;
        } else {
          if(getAdj(row,col,1,1)+getAdj(row,col,-1,-1) > 2){
            alertWin();
            return true;
          } else {
            return false;
          }
        }
      }
    }
   }

  // click handler on the frame
  function onClick(e){
    if(gameIsRunning == 1){
    //a function to check which player did make the click and which Sprite should be created
    function SpriteColor(){
      if(CurrentPlayer == 'p1'){
      return "blue";
    }else
      return "orange";
    }
    // creat an instance of sprite depending on which player is on right now
    let newCoin = new Coin(SpriteColor());
    // Coin.anchor.set(0.5); //center the anchor for the Sprite


    // check which colume the click event happend with, if x is smaller than 80px then its the first column and so on
    let xx = e.data.global.x;

    if(xx<80){
        newCoin.x = 8;
        newCoin.y = 364-(checkIndex(0)*71); // after checking the index assign y value accordenling
         switchPlayer();
      }else if(xx<150){
        newCoin.x = 79;
        newCoin.y = 364-(checkIndex(1)*71);
        switchPlayer();
      }else if(xx<220){
        newCoin.x = 151;
        newCoin.y = 364-(checkIndex(2)*71);
        switchPlayer();
      }else if(xx<290){
        newCoin.x = 221;
        newCoin.y = 364-(checkIndex(3)*71);
        switchPlayer();
      }else if(xx<370){
        newCoin.x = 293;
        newCoin.y = 364-(checkIndex(4)*71);
        switchPlayer();
      }else if(xx<430){
        newCoin.x = 363;
        newCoin.y = 364-(checkIndex(5)*71);
        switchPlayer();
      }else if(xx<550){
        newCoin.x = 434;
        newCoin.y = 364-(checkIndex(6)*71);
        switchPlayer();
      }
  // add the instance of the sprite
     app.stage.addChild(newCoin);
  }else{ // if the game is already finished alert the player of it 
    alert('The game have finshed '+ winner +' have won');
  }
  };
 }
}

let newGame = new game();
