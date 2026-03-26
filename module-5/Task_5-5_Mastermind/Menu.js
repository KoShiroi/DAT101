"use strict";

import { TSprite, TSpriteButtonHaptic } from "libSprite";
import { newGame, spcvs, SpriteInfoList } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";
import { checkAnswer } from "./CheckAnswer.js";
import { activRow, setActivRow } from "./ColorPicer.js"
import { colorPicker } from "./Mastermind.mjs";

export class TMenu{
  #backGround
  #ButtonNewGame
  #ButtonCheckAnswer
  #ButtonCheat
  #PanelHideAnswer
  #hints
  constructor(){
    this.#backGround=new TSprite(spcvs,SpriteInfoList.Board,0,0)
    this.#ButtonNewGame=new TSpriteButtonHaptic(spcvs,SpriteInfoList.ButtonNewGame,MastermindBoard.ButtonNewGame.x,MastermindBoard.ButtonNewGame.y);
    this.#ButtonCheckAnswer=new TSpriteButtonHaptic(spcvs,SpriteInfoList.ButtonCheckAnswer,MastermindBoard.ButtonCheckAnswer.x,MastermindBoard.ButtonCheckAnswer.y);
    this.#ButtonCheat=new TSpriteButtonHaptic(spcvs,SpriteInfoList.ButtonCheat,MastermindBoard.ButtonCheat.x,MastermindBoard.ButtonCheat.y);
    this.#PanelHideAnswer=new TSprite(spcvs,SpriteInfoList.PanelHideAnswer,MastermindBoard.PanelHideAnswer.x,MastermindBoard.PanelHideAnswer.y);
    this.#hints=[];

    this.#ButtonCheckAnswer.disabled=true;
    this.#ButtonCheat.onClick=this.#cheatButtonOnClick.bind(this);
    this.#ButtonNewGame.onClick=this.#newGameButton.bind(this);
    this.#ButtonCheckAnswer.onClick=this.#checkAnswer.bind(this);

  }
  #cheatButtonOnClick(){
    this.#PanelHideAnswer.hidden=!this.#PanelHideAnswer.hidden;
  }
  #newGameButton(){
    newGame()
  }
  #checkAnswer(){
    checkAnswer();
    setActivRow("Row" + (parseInt(activRow.slice(3)) + 1));
    colorPicker.forEach((e)=>{
      e.updateSnap()
    })
    this.enableCheckAnswer(false)
  }
  createHints(aRightPlace,aRightColor){
    console.log(aRightPlace,"|",aRightColor)
    let placement=0
    for(let i=0;i<aRightPlace;i++){
      let hint=new TSprite(spcvs,SpriteInfoList.ColorHint,MastermindBoard.AnswerHint[activRow][placement].x,MastermindBoard.AnswerHint[activRow][placement].y);
      placement++;
      hint.index=1;
      this.#hints.push(hint);
    }
    for(let i=0;i<aRightColor;i++){
      let hint=new TSprite(spcvs,SpriteInfoList.ColorHint,MastermindBoard.AnswerHint[activRow][placement].x,MastermindBoard.AnswerHint[activRow][placement].y);
      placement++;
      hint.index=3;
      this.#hints.push(hint);
    }
  }
  enableCheckAnswer(aBool){
    this.#ButtonCheckAnswer.disabled=!aBool;
  }
  
  drawBackground(){
    this.#backGround.draw();
  }
  draw(){
    this.#ButtonNewGame.draw();
    this.#ButtonCheckAnswer.draw();
    this.#ButtonCheat.draw();
    this.#PanelHideAnswer.draw();
    this.#hints.forEach((e)=>{
      e.draw()
    })
  }
}