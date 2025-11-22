import * as PIXI from 'pixi.js';

export default class Coin extends PIXI.Container {
  constructor(coinColor) {
    super();

    const radius = 28;

    // Define colors based on player
    const colors = {
      blue: { main: 0x3b82f6, dark: 0x1d4ed8, light: 0x93c5fd, rim: 0x2563eb },
      orange: { main: 0xf97316, dark: 0xc2410c, light: 0xfdba74, rim: 0xea580c }
    };

    const c = colors[coinColor] || colors.blue;

    // Create smooth coin using layered circles
    const shadow = new PIXI.Graphics();
    shadow.beginFill(0x000000, 0.25);
    shadow.drawCircle(2, 3, radius);
    shadow.endFill();
    this.addChild(shadow);

    // Outer rim
    const rim = new PIXI.Graphics();
    rim.beginFill(c.rim);
    rim.drawCircle(0, 0, radius);
    rim.endFill();
    this.addChild(rim);

    // Main coin body (slightly smaller)
    const body = new PIXI.Graphics();
    body.beginFill(c.main);
    body.drawCircle(0, 0, radius - 3);
    body.endFill();
    this.addChild(body);

    // Inner lighter area for 3D effect
    const inner = new PIXI.Graphics();
    inner.beginFill(c.light, 0.3);
    inner.drawCircle(-3, -3, radius - 10);
    inner.endFill();
    this.addChild(inner);

    // Top highlight shine
    const shine = new PIXI.Graphics();
    shine.beginFill(0xffffff, 0.35);
    shine.drawEllipse(-8, -10, 8, 5);
    shine.endFill();
    this.addChild(shine);
  }
}
