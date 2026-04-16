"use strict";
import {TSprite} from "libSprite";

export class TBackground{
  #spriteBackground;
  #spriteGround;
  constructor(aSpcvs,aSPI){
    this.#spriteBackground=new TSprite(aSpcvs,aSPI.background,0,0);
    this.#spriteGround=new TSprite(aSpcvs,aSPI.ground,0,aSPI.background.height-aSPI.ground.height)
  }
  drawBrackground(){
    this.#spriteBackground.draw();
  }
  drawGround(){
    this.#spriteGround.draw();
  }
  animate(){
    if((this.#spriteGround.x+(this.#spriteGround.width/2))<0){
      this.#spriteGround.x=0
    }else{this.#spriteGround.x-=1;}
  }
  updateDayNight(index){
    this.#spriteBackground.index=Math.abs(index-1);
  }
}