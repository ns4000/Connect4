import PIXI from 'pixi.js';

export default class Coin extends PIXI.Sprite{
  constructor(){
    super(PIXI.Texture.fromImage('./images/bluePlayer.png'));
    this.anchor.set(0.5);
  }
