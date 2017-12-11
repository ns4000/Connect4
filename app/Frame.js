import {Sprite} from 'pixi.js';

export default class Frame extends Sprite{
  constructor(){
 		super();

    // Frame is the Sprite of the background
    return PIXI.Sprite.fromImage('images/fial_board.png');
    
  }
}
