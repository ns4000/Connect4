import {Sprite} from 'pixi.js';

export default class Coin extends Sprite{
  constructor(coinColor){
 		super();
 		return PIXI.Sprite.fromImage('./images/'+ coinColor+'Player.png'); 
        this.anchor.set(0.5);
  }
}
