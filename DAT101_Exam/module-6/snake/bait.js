"use strict";
//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import { TSprite } from "libSprite";
import { TPoint } from "lib2d";
import { GameProps, SheetData } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.js";

//------------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

export class TBait extends TSprite {
  #boardCell = null;
  constructor(aSpriteCanvas) {
    const pos = new TPoint(0, 0);
    super(aSpriteCanvas, SheetData.Bait, pos.x, pos.y);
    this.#boardCell = new TBoardCell(0, 0);
    this.update();
  } // End of constructor

  update() {
    // Move the bait to a random empty cell on the game board
    do{
      this.#boardCell.col = Math.floor(Math.random() * GameProps.gameBoard.cols);
      this.#boardCell.row = Math.floor(Math.random() * GameProps.gameBoard.rows);
    }while(GameProps.gameBoard.getCell(this.#boardCell.row, this.#boardCell.col).infoType !== EBoardCellInfoType.Empty);
    this.x = this.#boardCell.col * this.spi.width;
    this.y = this.#boardCell.row * this.spi.height;
    // Update the bait cell info type to Bait
    GameProps.gameBoard.getCell(this.#boardCell.row, this.#boardCell.col).infoType = EBoardCellInfoType.Bait
  } // End of update

}
