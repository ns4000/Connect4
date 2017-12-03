let app = new PIXI.Application(512,445,{backgroundColor:0Xf9f9f9});
document.getElementById('display').appendChild(app.view);


// a varilable to keep track which player is current set to default player 1 = p1
let CurrentPlayer = "p1";
// indexArr is gona work as refrence to match the postion of the coins of which CurrentPlayer and help decied the win condetion
let indexArr = [[{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}],
                [{Player:null},{Player:null},{Player:null},{Player:null},{Player:null},{Player:null}]
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

// checking wheather a cell of the array is empty if so add a coin with a refrence to which player
function checkIndex(col){
  if(indexArr[col][0].Player == null){
     indexArr[col][0].Player = CurrentPlayer;
     switchPlayer();
     return 0;// this return value is to determin which row the coin should go to
  }else if(indexArr[col][1].Player == null){
           indexArr[col][1].Player = CurrentPlayer;
     switchPlayer();
     return 1;
  }else if(indexArr[col][2].Player == null){
           indexArr[col][2].Player = CurrentPlayer;
     switchPlayer();
     return 2;
  }else if(indexArr[col][3].Player == null){
           indexArr[col][3].Player = CurrentPlayer;
     switchPlayer();
     return 3;
  }else if(indexArr[col][4].Player == null){
           indexArr[col][4].Player = CurrentPlayer;
     switchPlayer();
     return 4;
  }else if(indexArr[col][5].Player == null){
           indexArr[col][5].Player = CurrentPlayer;
     switchPlayer();
     return 5;
  }else if(indexArr[col][6].Player == null){
           indexArr[col][6].Player = CurrentPlayer;
     switchPlayer();
     return 6;
  }
};

// click handler on the frame
function onClick(e){
  //need to make a if statment to check which player did make the click and which Sprite should be made
  function SpriteColor(){
    if(CurrentPlayer == 'p1'){
    return "images/bluePlayer.png";
  }else
    return "images/orangePlayer.png";
  }
  // creat an instance of sprite
  let Coin = PIXI.Sprite.fromImage(SpriteColor());
  Coin.anchor.set(0.5);


  // check which colume the click event happend with, if x is smaller than 80px then its the first column and so on
  let xx = e.data.global.x;
  console.log(xx);
  if(xx<80){

      Coin.x = 40;
      Coin.y = 396-(checkIndex(0)*70); // after checking the index assign y value accordenling
    }else if(xx<150){
      Coin.x = 111;
      Coin.y = 396-(checkIndex(1)*70);
    }else if(xx<220){
      Coin.x = 182;
      Coin.y = 396-(checkIndex(2)*70);
    }else if(xx<290){
      Coin.x = 253;
      Coin.y = 396-(checkIndex(3)*70);
    }else if(xx<370){
      Coin.x = 323;
      Coin.y = 396-(checkIndex(4)*70);
    }else if(xx<430){
      Coin.x = 395;
      Coin.y = 396-(checkIndex(5)*70);
    }else if(xx<550){
      Coin.x = 466;
      Coin.y = 396-(checkIndex(6)*70);
    }
// add the instance of the sprite
   app.stage.addChild(Coin);
   console.log(indexArr);
};
