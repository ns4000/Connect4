import * as PIXI from 'pixi.js';

export default class Frame extends PIXI.Container {
  constructor() {
    super();

    const cols = 7;
    const rows = 6;
    const cellSize = 73;
    const holeRadius = 30;
    const padding = 10;

    const boardWidth = cols * cellSize + padding * 2;
    const boardHeight = rows * cellSize + padding * 2;

    // Main board background with gradient effect
    const board = new PIXI.Graphics();

    // Draw board shadow
    board.beginFill(0x1a3a5c, 0.5);
    board.drawRoundedRect(4, 4, boardWidth, boardHeight, 15);
    board.endFill();

    // Draw main board (blue)
    board.beginFill(0x2563eb);
    board.drawRoundedRect(0, 0, boardWidth, boardHeight, 15);
    board.endFill();

    // Add highlight on top edge
    board.beginFill(0x3b82f6);
    board.drawRoundedRect(0, 0, boardWidth, 8, 15);
    board.endFill();

    // Draw the circular holes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = padding + col * cellSize + cellSize / 2;
        const y = padding + row * cellSize + cellSize / 2;

        // Hole shadow (inner)
        board.beginFill(0x1e3a5f);
        board.drawCircle(x + 2, y + 2, holeRadius);
        board.endFill();

        // Main hole (shows background through it)
        board.beginFill(0x0f172a);
        board.drawCircle(x, y, holeRadius);
        board.endFill();

        // Inner highlight ring
        board.lineStyle(2, 0x1e40af, 0.5);
        board.drawCircle(x, y, holeRadius - 2);
        board.lineStyle(0);
      }
    }

    // Add bottom stand/base
    const standWidth = boardWidth - 40;
    const standHeight = 20;
    const standX = 20;
    const standY = boardHeight;

    board.beginFill(0x1e40af);
    board.moveTo(standX, standY);
    board.lineTo(standX + standWidth, standY);
    board.lineTo(standX + standWidth - 10, standY + standHeight);
    board.lineTo(standX + 10, standY + standHeight);
    board.closePath();
    board.endFill();

    this.addChild(board);
  }
}
