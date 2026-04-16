"use strict";
// Import necessary modules
import { TSpriteCanvas } from "libSprite";
import { TBackground } from "./background.js";
import { THero } from "./hero.js";
import { TObstacle } from "./obstacle.js";
import { TBait } from "./bait.js";
import { TMenu } from "./menu.js";

//--------------- Objects and Variables ----------------------------------//
const chkMuteSound = document.getElementById("chkMuteSound");
const rbDayNight = document.getElementsByName("rbDayNight");
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);
spcvs.showFramerate=true;


// prettier-ignore
const SpriteInfoList = {
  hero1:        { x: 0   , y: 545 , width: 34   , height: 24  , count: 4  },
  hero2:        { x: 0   , y: 569 , width: 34   , height: 24  , count: 4  },
  hero3:        { x: 0   , y: 593 , width: 34   , height: 24  , count: 4  },
  obstacle:     { x: 0   , y: 0   , width: 52   , height: 320 , count: 4  },
  background:   { x: 245 , y: 0   , width: 576  , height: 512 , count: 2  },
  flappyBird:   { x: 0   , y: 330 , width: 178  , height: 50  , count: 1  },
  ground:       { x: 246 , y: 512 , width: 1152 , height: 114 , count: 1  },
  numberSmall:  { x: 681 , y: 635 , width: 14   , height: 20  , count: 10 },
  numberBig:    { x: 422 , y: 635 , width: 24   , height: 36  , count: 10 },
  buttonPlay:   { x: 1183, y: 635 , width: 104  , height: 58  , count: 1  },
  gameOver:     { x: 0   , y: 384 , width: 226  , height: 114 , count: 1  },
  infoText:     { x: 0   , y: 630 , width: 200  , height: 55  , count: 2  },
  food:         { x: 0   , y: 696 , width: 70   , height: 65  , count: 34 },
  medal:        { x: 985 , y: 635 , width: 44   , height: 44  , count: 4  },
};

export const EGameStatus = { idle: 0, playing: 1, dead: 2, gameOver: 3,
  state: 0, score: 0
};
const background=new TBackground(spcvs, SpriteInfoList);
export const hero=new THero(spcvs, SpriteInfoList.hero1);
let obstacles=[];
let baits=[];
export const menu=new TMenu(spcvs, SpriteInfoList);
let timeOutID=[0,0]
let night=false;

//--------------- Functions ----------------------------------------------//

export function startGame(){
  if(EGameStatus.state===EGameStatus.dead || EGameStatus.state===EGameStatus.gameOver){return;}
  EGameStatus.state=EGameStatus.playing;
  timeOutID[0]=setTimeout(spawnObstacle,1000);
  timeOutID[1]=setTimeout(spawnBait,1000);
}

export function clearObstacles(){
  clearTimeout(timeOutID[0]);
  clearTimeout(timeOutID[1]);
  obstacles=[];
  baits=[];
}

function spawnObstacle(){
  const rng=Math.random()*1000+1000;
  timeOutID[0]=setTimeout(spawnObstacle,rng);
  if(EGameStatus.state!=EGameStatus.playing){return};
  const obstacle=new TObstacle(spcvs, SpriteInfoList);
  if(night){
    obstacle.nightPipes=true;
  }
  obstacles.push(obstacle);
  if(obstacles.length>5){
    `amount of obstacles: ${console.log(obstacles.length)}`
  }
}
function spawnBait(){
  const rng=Math.random()*3500+1000;
  timeOutID[1]=setTimeout(spawnBait,rng);
  if(EGameStatus.state!=EGameStatus.playing){return};
  const bait=new TBait(spcvs, SpriteInfoList);
  baits.push(bait);
}

function drawGame(){
  background.drawBrackground();
  baits.forEach(element => {
    element.draw();
  });
  obstacles.forEach(element => {
    element.draw();
  });
  background.drawGround();
  hero.draw();
  menu.draw();
}

function animateGame(){
  menu.updateScore();
  hero.animate();
  baits.forEach(element => {
    element.animate();
    if(element.distanceTo(hero.center)<30){
      if(EGameStatus.state!=EGameStatus.playing){return;}
      element.kill=true;
      const killIndex=baits.findIndex(obj => obj.kill === true);
      baits.splice(killIndex,1);
      hero.eat();
      console.log(`Kill +${element.point} (${EGameStatus.score+=element.point})`)
    }
  });
  if(EGameStatus.state!=EGameStatus.playing){return;}
  background.animate();
  obstacles.forEach(element =>{
    element.animate();
    if(element.kill){
      obstacles.shift();
    }
  })
}

function loadGame() {
  console.log("Game Loaded");
  // Set canvas size to background size
  cvs.width = SpriteInfoList.background.width;
  cvs.height = SpriteInfoList.background.height; 

  // Overload the spcvs draw function here!
  spcvs.onDraw=drawGame;

  //start  animate moter
  setInterval(animateGame,1)
} // end of loadGame


function onKeyDown(aEvent) {
  switch (aEvent.code) {
    case "Space":
      hero.flap();
      break;
  }
} // end of onKeyDown

function setSoundOnOff(){
  // Mute or unmute the game sound based on checkbox
  menu.muteMenu();
  hero.muteHero();
} // end of setSoundOnOff

function setDayNight(aEvent){ 
  // Set day or night mode based on radio buttons
  // Day mode is when value is 1, night mode is 0, you can use this as a boolean, 1=true, 0=false
  // e.g., isDayMode = (aEvent.target.value == 1);
  night=!night;
  background.updateDayNight(aEvent.target.value);
  obstacles.forEach(e=>{
    e.nightPipes=Math.abs(aEvent.target.value-1)
  })
  console.log(`Day/Night mode changed: ${aEvent.target.value}`);

} // end of setDayNight

//--------------- Main Code ----------------------------------------------//
chkMuteSound.addEventListener("change", setSoundOnOff);
rbDayNight[0].addEventListener("change", setDayNight);
rbDayNight[1].addEventListener("change", setDayNight);

// Load the sprite sheet
spcvs.loadSpriteImage("./Media/FlappyBirdSprites.png", loadGame);
document.addEventListener("keydown", onKeyDown);
