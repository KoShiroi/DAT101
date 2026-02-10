"use strict";

import { TPoint, TCircle } from "lib2d";
import { TSprite,TSpriteButton, TSpriteNumber, ESpriteNumberJustifyType } from "libSprite";
import { TColorButton } from "./ColorButton.js";
import { activateAudioContext } from "libSound";
import { spawnColorButton, EGameStatusType, resetGame } from "./SimonSays.mjs";

export class TGameBoard extends TSprite{
  #colorButtons;
  #gameInfo;
  #isSoundEnabled;
  #spRound;
  #spFinialScore
  constructor(aSpcvs, aSPI){
    super(aSpcvs,aSPI.Background,0,0)
    const boardCenter=new TPoint(aSPI.Background.width/2,aSPI.Background.height/2)
    this.#colorButtons=[
      new TColorButton(aSpcvs,aSPI.ButtonYellow,boardCenter),
      new TColorButton(aSpcvs,aSPI.ButtonBlue,boardCenter),
      new TColorButton(aSpcvs,aSPI.ButtonRed,boardCenter),
      new TColorButton(aSpcvs,aSPI.ButtonGreen,boardCenter),
    ];
    this.#gameInfo=new TSpriteButton(aSpcvs,aSPI.ButtonStartEnd,boardCenter.x-aSPI.ButtonStartEnd.width/2,boardCenter.y-aSPI.ButtonStartEnd.height/2,TCircle);
    this.#disableColorButtons=true;
    this.#gameInfo.onClick=this.#clickStart.bind(this);
    this.#isSoundEnabled=false;
    this.#spRound=new TSpriteNumber(aSpcvs,aSPI.number,405,385,undefined,undefined,2)
    this.#spRound.value=0
    this.#spFinialScore=new TSpriteNumber(aSpcvs,aSPI.number,boardCenter.x,440,undefined,undefined,1)
    this.#spFinialScore.visible=false;
  }
  draw(){
    super.draw();
    this.#colorButtons.forEach(element => {
      element.draw();
    });
    this.#spRound.draw();
    this.#gameInfo.draw();
    this.#spFinialScore.draw();
  }
  set #disableColorButtons(aDisable){
    this.#colorButtons.forEach(element => {
      element.disabled = aDisable;
    });
  }
  #clickStart(){
    this.#gameInfo.hidden=true;
    this.#disableColorButtons=false;
    if(this.#isSoundEnabled===false){
      activateAudioContext();
      this.#isSoundEnabled=true;
      for(let i=0; i<this.#colorButtons.length;i++){
        this.#colorButtons[i].createSound(i);
      }
    }
    this.#spFinialScore.visible=false;
    resetGame();
    spawnColorButton();
  }
  gameOver(){
    EGameStatusType.state=EGameStatusType.GameOver;
    this.#gameInfo.index=1;
    this.#gameInfo.hidden=false;
    this.#spFinialScore.value=this.#spRound.value;
    this.#spFinialScore.visible=true;
    this.#disableColorButtons=true;
  }
  get colorButtons(){
    return this.#colorButtons;
  }
  updateScore(aRound){
    this.#spRound.value=aRound;
  }
}