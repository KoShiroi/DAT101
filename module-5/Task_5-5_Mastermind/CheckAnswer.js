"use strict"
import { computerAnswer, menu } from "./Mastermind.mjs"
import { playerAnswer } from "./ColorPicer.js"

export function checkAnswer(){
  console.log(computerAnswer,playerAnswer)
  let cPlayerAnswer=[...playerAnswer];
  let cComputerAnswer=[...computerAnswer];

  let rightPlace=[];
  for(let i=0;i<cPlayerAnswer.length;i++){
    if(cPlayerAnswer[i].index===cComputerAnswer[i].index){
      rightPlace.push(i)
    }
  }
  rightPlace.reverse().forEach((e)=>{
    cComputerAnswer.splice(e,1)
    cPlayerAnswer.splice(e,1)
  })

  let rightColor=[];
  for(let p=0;p<cPlayerAnswer.length;p++){
    for(let c=0;c<cComputerAnswer.length;c++){
      if((cPlayerAnswer[p].index==cComputerAnswer[c].index)&&!rightColor.includes(c)){
        rightColor.push(c);
        break;
      }
    }
  }
  menu.createHints(rightPlace.length,rightColor.length)
}