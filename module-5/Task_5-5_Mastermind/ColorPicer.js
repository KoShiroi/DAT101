"use strict";

import { TSpriteDraggable, TSnapTo } from "libSprite";
import { spcvs, SpriteInfoList, colorPicker, menu } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs"
import { TPoint } from "lib2d";

export let activRow="Row1";
export function setActivRow(row){
  activRow=row;
}
export let playerAnswer=[null,null,null,null];

class TSnapping extends TSnapTo{
  constructor(){
    super(MastermindBoard.PlayerAnswer[activRow],30)
  }
}

export class TColorPicker extends TSpriteDraggable{
  constructor(aPos){
    super(spcvs,SpriteInfoList.ColorPicker,aPos.x,aPos.y)
    this.snapTo=new TSnapping();
    this.initPos=new TPoint(aPos.x,aPos.y);
  }
  updateSnap(){
    this.snapTo=new TSnapping();
  }

  duplicate(){
    const newColorPicker=new TColorPicker(this.initPos)
    newColorPicker.index=this.index;
    return newColorPicker;
  }

  onDrop(aPos){
    colorPicker.push(this.duplicate());
    for(let i=0; i<MastermindBoard.PlayerAnswer[activRow].length;i++){
      if(aPos.x==MastermindBoard.PlayerAnswer[activRow][i].x&&aPos.y==MastermindBoard.PlayerAnswer[activRow][i].y){
        playerAnswer[i]=this;
      }
    }
    let count=0;
    playerAnswer.forEach(element => {
      if(element!==null){
        count++;
      }
    });
    if(count>=4){
      menu.enableCheckAnswer(true);
    }
  }

  canDrop(aPos){
    let bool=false;
    MastermindBoard.PlayerAnswer[activRow].forEach(e => {
      if(e.x==aPos.x&&e.y==aPos.y){
        bool=true;
      }
    });
    return bool;
  }

  onStartDrag(){
    const index=colorPicker.indexOf(this);
    colorPicker.splice(index,1);
    colorPicker.push(this);
  }
}