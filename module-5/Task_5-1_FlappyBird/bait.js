"use strict";
import {TSprite} from "libSprite";
import {EGameStatus} from "./FlappyBird.mjs";
import {TSineWave} from "lib2d"; 

export class TBait extends TSprite{
  #speed;
  #wave;
  constructor(aSpcvs,aSPI){
    const rngDictance=Math.random()+1
    super(aSpcvs,aSPI.food,aSPI.background.width*rngDictance,100);
    this.screen=aSPI.background
    this.animationSpeed=40;

    const rng=Math.floor(Math.random()*6+3);
    const flip=Math.random() < 0.5 ? -1 : 1;
    this.#wave=new TSineWave(aSPI.background.height/rng*flip,0.1)
    this.#speed=0.1*(rng-2);

    this.kill=false;
    this.point=5;
  }
  animate(){
    this.y=this.#wave.value+(this.screen.height)/3
    if(EGameStatus.state!=EGameStatus.playing){
      this.x+=1-this.#speed;
    }else{
      this.x-=this.#speed;
    }
  }
  distanceTo(aPoint){
    const dx=(this.center.x-aPoint.x)**2;
    const dy=(this.center.y-aPoint.y)**2;
    return (dx+dy)**(1/2)
  }
}