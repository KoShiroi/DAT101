"use strict";
import {TSprite, TSpriteButton,TSpriteNumber} from "libSprite";
import {startGame} from "./FlappyBird.mjs";
import {EGameStatus, hero, clearObstacles} from "./FlappyBird.mjs";

const fnCountDown="./Media/countDown.mp3";
const fnRunning="./Media/running.mp3";

export class TSoundFileImproved{
  #audio;
  #audioVolume;
  constructor(aSoundFile){
    this.#audio=new Audio(aSoundFile)
    this.#audioVolume=1;
  }
  play(){
    this.#audio.currentTime=0;
    this.#audio.play();
  }
  stop(){
    this.#audio.pause();
  }
  set muted(mut){
    this.#audio.muted=mut;
  }
  get muted(){
    return this.#audio.muted;
  }
  set volume(vol){
    this.#audioVolume=vol;
    this.#audio.volume=vol;
  }
  get volume(){
    return this.#audioVolume;
  }
}

export class TMenu{
  #spTitle;
  #spPlayBtn;
  #spScore;
  #spCountDown;
  #spGameOverScore;
  #spEndScore;
  #spMedal;
  #sfCountDown;
  #sfRunning;
  #bestScore;
  #infoText;
  constructor(aSpcvs,aSPI){
    this.#spTitle=new TSprite(aSpcvs,aSPI.flappyBird, aSPI.background.width/2-aSPI.flappyBird.width/2, 150);
    this.#spPlayBtn=new TSpriteButton(aSpcvs,aSPI.buttonPlay, aSPI.background.width/2-aSPI.buttonPlay.width/2, 250);
    this.#spPlayBtn.addEventListener("click",this.spPlayBtnClick.bind(this));
    this.#spScore=[]
    this.aSpcvs=aSpcvs
    this.aSPI=aSPI
    this.#spScore.push(new TSprite(aSpcvs,aSPI.numberBig,aSPI.background.width-aSPI.numberBig.width-10,10));
    this.#spCountDown=new TSpriteNumber(aSpcvs,aSPI.numberBig,aSPI.background.width/2-aSPI.numberBig.width/2,250);
    this.#spGameOverScore=new TSprite(aSpcvs,aSPI.gameOver,aSPI.background.width/2-aSPI.gameOver.width/2,120);
    this.#spEndScore=new TSpriteNumber(aSpcvs,aSPI.numberSmall,390-aSPI.numberSmall.width/2,155,undefined,0,2);
    this.#spMedal=new TSprite(aSpcvs,aSPI.medal,202,163)
    this.#bestScore=new TSpriteNumber(aSpcvs,aSPI.numberSmall,390-aSPI.numberSmall.width/2,195,undefined,0,2);
    this.#infoText=new TSprite(aSpcvs,aSPI.infoText,aSPI.background.width/2-aSPI.infoText.width/2,150);
    this.#infoText.hidden=true;
    this.#spCountDown.visible=false;
    this.#sfCountDown=null;
    this.#sfRunning=null;
    this.#spGameOverScore.hidden=true;
    this.#spMedal.hidden=true;
    this.#spEndScore.visible=false;
    this.#bestScore.visible=false;
    this.audioMute=false;
  }
  updateScore(){
    for(let i=0;i<this.#spScore.length;i++){
      if(EGameStatus.score>=10**this.#spScore.length){
        this.#spScore.push(new TSprite(this.aSpcvs,this.aSPI.numberBig,this.aSPI.background.width-this.aSPI.numberBig.width*(this.#spScore.length+1)-10,10));
      }
      this.#spScore[i].index=Math.floor(EGameStatus.score/10**i)%10;
      this.#spScore[i].alpha=0.8
    }
  }
  saveBest(){
    if(!(sessionStorage.getItem("bestScore")&&sessionStorage.getItem("bestScore")>EGameStatus.score)){
      sessionStorage.setItem("bestScore",EGameStatus.score);
      this.#bestScore.value=EGameStatus.score;
    }else{
      this.#bestScore.value=sessionStorage.getItem("bestScore");
    }
  }
  draw(){
    this.#spScore.forEach(element => {
      element.draw();
    });
    this.#spTitle.draw();
    this.#spPlayBtn.draw();
    this.#spCountDown.draw();
    this.#spGameOverScore.draw();
    this.#spEndScore.draw();
    this.#spMedal.draw();
    this.#bestScore.draw();
    this.#infoText.draw();
  }
  countDown(){
    if(this.#spCountDown.value==1){
      this.#spCountDown.visible=false;
      this.#infoText.hidden=true;
      startGame();
      this.#sfRunning=new TSoundFileImproved(fnRunning);
      this.#sfRunning.muted=this.audioMute;
      this.#sfRunning.volume=0.4;
      this.#sfRunning.play();
    }else{
      this.#spCountDown.value--;
      setTimeout(this.countDown.bind(this),1000)
    }
  }
  muteMenu(){
    this.audioMute=!this.audioMute;
    if(this.#sfCountDown){
      this.#sfCountDown.muted=!this.#sfCountDown.muted;
    }
    if(this.#sfRunning){
      this.#sfRunning.muted=!this.#sfRunning.muted;
    }
  }

  stopSound(){
    this.#sfRunning.stop();
  }
  resetGame(){
    while(this.#spScore.length>1){
      this.#spScore.pop()
    }
    EGameStatus.score=0;
    EGameStatus.state=EGameStatus.idle;
    hero.resetHero();
    clearObstacles();
    this.#spGameOverScore.hidden=true;
    this.#spEndScore.visible=false;
    this.#bestScore.visible=false;
    this.#spTitle.hidden=false;
    this.#spMedal.hidden=true;
    this.#spMedal.index=0;
    this.#infoText.y=150;
    this.#infoText.index=0;
  }
  spPlayBtnClick(){
    this.resetGame()
    this.#spPlayBtn.hidden=true;
    this.#infoText.hidden=false;
    this.#spTitle.hidden=true;
    this.#spCountDown.value=3;
    this.#spCountDown.visible=true;
    this.#sfCountDown=new TSoundFileImproved(fnCountDown)
    this.#sfCountDown.muted=this.audioMute;
    this.#sfCountDown.volume=1;
    this.#sfCountDown.play();
    setTimeout(this.countDown.bind(this),1000)
  }
  gameOverMenu(){
    this.#spPlayBtn.hidden=false;
    this.#spGameOverScore.hidden=false;
    this.#spEndScore.visible=true;
    this.#spEndScore.value=EGameStatus.score;
    this.#bestScore.visible=true;
    this.#infoText.index=1;
    this.#infoText.hidden=false;
    this.#infoText.y=80;
    switch(true){
      case EGameStatus.score>=45:
        this.#spMedal.index=2;//gold
        this.#spMedal.hidden=false;
        break;
      case EGameStatus.score>=25:
        this.#spMedal.index=1;//silver
        this.#spMedal.hidden=false;
        break;
      case EGameStatus.score>=10:
        this.#spMedal.index=3;//bronze
        this.#spMedal.hidden=false;
        break;
    }
  }
}