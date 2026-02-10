"use strict";
import { EGameStatusType, spawnColorButton } from "./SimonSays.mjs";
import { TGameBoard } from "./gameBoard.js"
import { gameBoard } from "./SimonSays.mjs"

let colorButton=null;
let sequence=[];
let sequenceIndex=0
let round=0;

export function addRandomButton(aColorButtons){
  const rng=Math.floor(Math.random()*aColorButtons.length);
  colorButton=aColorButtons[rng];
  sequence.push(colorButton);
  setTimeout(setButtonDown,1000);
}
export function userInput(aColorButton){
  if(aColorButton==sequence[sequenceIndex]){
    sequenceIndex++;
    if(EGameStatusType.state!=EGameStatusType.Playing){return}
    if(sequenceIndex>=sequence.length){
      round++;
      gameBoard.updateScore(round);
      sequenceIndex=0;
      spawnColorButton();
      console.log("next round")
    }else{
      console.log("next player index")
    }
  }else{
    console.log("GameOver")
    gameBoard.gameOver();
  }
}
export function resetSequence(){
  sequence=[];
  round=0;
  sequenceIndex=0;
}
function setButtonDown(){
  if(sequenceIndex>=sequence.length){
  }else{
    sequence[sequenceIndex].onMouseDown();
  }
  setTimeout(setButtonUp,450);
}
function setButtonUp(){
  if(sequenceIndex>=(sequence.length-1)){
    sequence[sequenceIndex].onMouseUp();
    EGameStatusType.state=EGameStatusType.Playing;
    sequenceIndex=0;
    console.log("sequence done")
  }else{
    sequence[sequenceIndex].onMouseUp();
    setTimeout(setButtonDown,150);
  }
}
