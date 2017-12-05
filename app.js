let app = new PIXI.Application(512,445,{backgroundColor:0Xf9f9f9});
document.getElementById('display').appendChild(app.view);


// a varilable to keep track which player is current set to default player 1 = p1
let CurrentPlayer = "p1";
// indexArr is gona work as refrence to match the postion of the coins of which CurrentPlayer and help decied the win condetion
let indexArr = [[{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}]
              ];


// Frame is the Sprite of the background
let Frame = PIXI.Sprite.fromImage('images/fial_board.png');
    Frame.scale.set(0.71);
// adding the frame to contanier
app.stage.addChild(Frame);

// setting the Frame interactive and adding an event for mouse cliking
Frame.interactive = true;
Frame.on('pointerup',onClick);

// a function to switch between first and second Player
function switchPlayer(){
  if (CurrentPlayer == "p1")
      CurrentPlayer =  "p2";
  else
      CurrentPlayer =  "p1";
};


// need to add a if statment for row check if full
// checking wheather a cell of the array is empty if so add a coin with a refrence to which player
function checkIndex(col){
  if(indexArr[0][col].Player == null){
     indexArr[0][col].Player = CurrentPlayer;
     winCheck(0,col);
     // switchPlayer();
     return 0;// this return value is to determin which row the coin should go to
  }else if(indexArr[1][col].Player == null){
           indexArr[1][col].Player = CurrentPlayer;
           winCheck(1,col);

     return 1;
  }else if(indexArr[2][col].Player == null){
           indexArr[2][col].Player = CurrentPlayer;
           winCheck(2,col);
     // switchPlayer();
     return 2;
  }else if(indexArr[3][col].Player == null){
           indexArr[3][col].Player = CurrentPlayer;
           winCheck(3,col);
     // switchPlayer();
     return 3;
  }else if(indexArr[4][col].Player == null){
           indexArr[4][col].Player = CurrentPlayer;
           winCheck(4,col);
     // switchPlayer();
     return 4;
  }else if(indexArr[5][col].Player == null){
           indexArr[5][col].Player = CurrentPlayer;
           winCheck(5,col);
     // switchPlayer();
     return 5;
  }else if(indexArr[6][col].Player == null){
           indexArr[6][col].Player = CurrentPlayer;
           winCheck(6,col);
     // switchPlayer();
     return 6;
  }
};

function alertWin(){
  alert(CurrentPlayer +' have won')

}

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


// winCheck should get the column and row and check if a horizantal, verticall or diagonal serise of 4 same value of current player occur then its should be a win
function winCheck(row,col){
  console.log("row value "+row,'col value '+col);
  if(getAdj(row,col,0,1)+getAdj(row,col,0,-1) > 2){
    alertWin();
  } else {
    if(getAdj(row,col,1,0) > 2){
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
//
// function getAdj(row,col,row_inc,col_inc){
//   if(cellVal(row,col) == cellVal(row+row_inc,col+col_inc)){
//     return 1+getAdj(row+row_inc,col+col_inc,row_inc,col_inc);
//   } else {
//     return 0;
//   }
// }
//
// function cellVal(row,col){
//   if(indexArr[row] == undefined || indexArr[row][col] == undefined){
//     return -1;
//   } else {
//     return indexArr[row][col];
//   }
// }


  // for (i = 0; i <= 6; i++){
  //   for(j = 0; j <=7; j++){
  //     console.log(indexArr[i][j].Player);
  //     if(indexArr[i][j].Player == CurrentPlayer) {
  //       youWon++;
  //       if(youWon==4){
  //         alertWin();
  //       }
  //     }else {
  //       youWon = 0;
  //       return}
  //   }
  // }

  // indexArr.map([row][col])


  // if (col < 3) {
  //         if(indexArr[row][col].Player==CurrentPlayer
  //          &&indexArr[row][col + 1].Player==CurrentPlayer
  //          &&indexArr[row][col + 2].Player==CurrentPlayer
  //          &&indexArr[row][col + 3].Player==CurrentPlayer){
  //
  //           alertWin();
  //         }
  // }

// };//end of winCheck()



// click handler on the frame
function onClick(e){
  //a function to check which player did make the click and which Sprite should be created
  function SpriteColor(){
    if(CurrentPlayer == 'p1'){
    return "images/bluePlayer.png";
  }else
    return "images/orangePlayer.png";
  }
  // creat an instance of sprite depending on which player is on right now
  let Coin = PIXI.Sprite.fromImage(SpriteColor());
  Coin.anchor.set(0.5); //center the anchor for the Sprite


  // check which colume the click event happend with, if x is smaller than 80px then its the first column and so on
  let xx = e.data.global.x;

  if(xx<80){
      Coin.x = 40;
      Coin.y = 396-(checkIndex(0)*71); // after checking the index assign y value accordenling
       switchPlayer();
    }else if(xx<150){
      Coin.x = 111;
      Coin.y = 396-(checkIndex(1)*71);
      switchPlayer();
    }else if(xx<220){
      Coin.x = 182;
      Coin.y = 396-(checkIndex(2)*71);
      switchPlayer();
    }else if(xx<290){
      Coin.x = 253;
      Coin.y = 396-(checkIndex(3)*71);
      switchPlayer();
    }else if(xx<370){
      Coin.x = 323;
      Coin.y = 396-(checkIndex(4)*71);
      switchPlayer();
    }else if(xx<430){
      Coin.x = 395;
      Coin.y = 396-(checkIndex(5)*71);
      switchPlayer();
    }else if(xx<550){
      Coin.x = 466;
      Coin.y = 396-(checkIndex(6)*71);
      switchPlayer();
    }
// add the instance of the sprite
   app.stage.addChild(Coin);
   console.log(indexArr);
};
