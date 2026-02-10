"use strict";

import { TSpriteButton } from "libSprite";
import { EOctave, ENoteName, Notes, TSoundWave } from "libSound";
import { userInput } from "./sequence.js";
import { EGameStatusType } from "./SimonSays.mjs";

export class TColorButton extends TSpriteButton{
  #dst;
  #boardCenter;
  #sound;
  constructor(aSpcvs, aSPI,boardCenter){
    super(aSpcvs,aSPI,aSPI.dst.x,aSPI.dst.y)
    this.#dst=aSPI.dst;
    this.#boardCenter=boardCenter;
    this.#sound=null;
  }
  isMouseOver(aMousePos){
    const isOver=super.isMouseOver(aMousePos);
    if(!isOver){return false;}
    const dx=this.#boardCenter.x-aMousePos.x;
    const dy=this.#boardCenter.y-aMousePos.y;
    const hyp=(dy**2+dx**2)**(1/2);
    if((hyp>this.#dst.r1)&&(hyp<this.#dst.r2)){
      return true;
    }else{
      return false;
    }
  }
  onMouseDown(){
    this.index=1;
    if(this.#sound){
      this.#sound.play();
    }
  }
  onMouseLeave(aEvent){
    super.onMouseLeave(aEvent);
    this.index=0;
    if(this.#sound){
      this.#sound.stop();
    }
  }
  onMouseUp(){
    this.index=0;
    if(this.#sound){
      this.#sound.stop();
    }
    userInput(this);
  }
  createSound(aIndex){
    switch (aIndex) {
      case 0:
        this.#sound=new TSoundWave(EOctave.Octave6,ENoteName.C)
        break;
      case 1:
        this.#sound=new TSoundWave(EOctave.Octave6,ENoteName.E)
        break;
      case 2:
        this.#sound=new TSoundWave(EOctave.Octave5,ENoteName.G)
        break;
      case 3:
        this.#sound=new TSoundWave(EOctave.Octave5,ENoteName.B)
        break;
      default:
        break;
    }
  }
}