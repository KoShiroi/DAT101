"use strict";
import {TSnake} from "./snake.js"
import {TPortal} from "./portal.js"

const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");

export const board={
  cellSize:32,
  cols:24,
  rows:18
};

cvs.width=board.cellSize*board.cols;
cvs.height=board.cellSize*board.rows;

const audioCtx=new AudioContext();

const sound={
  isMuted:false,
  eat:{isStarted:false,type:"triangle",frequency:500,vol:0.2,fade:{in:0.01,hold:0.04,out:0.3}},
  button:{isStarted:false,type:"triangle",frequency:250,vol:0.45,fade:{in:0.01,hold:0.1,out:0.06}},
  death:{isStarted:false,type:"sawtooth",frequency:125,vol:0.05,fade:{in:0.01,hold:0.1,out:0.05}},
  portal:{isStarted:false,type:"square",frequency:100,vol:0.1,fade:{in:0.25,hold:0.1,out:0.45}},
  makeSound(name){
    let s=this[name]
    const now=audioCtx.currentTime;
    if(!s.isStarted){
      s.osc=new OscillatorNode(audioCtx,{type:s.type,frequency:s.frequency})
      s.gain=new GainNode(audioCtx,{gain:0})
      s.isStarted=true

      s.osc.connect(s.gain).connect(audioCtx.destination);
      s.osc.start(now);

      this[name]=s;
    }
    s.gain.gain.cancelScheduledValues(now);
    s.gain.gain.setValueAtTime(0,now);
    if(!sound.isMuted){
      s.gain.gain.linearRampToValueAtTime(1*s.vol,now+s.fade.in);
      s.gain.gain.setValueAtTime(1*s.vol,now+s.fade.in+s.fade.hold);
      s.gain.gain.linearRampToValueAtTime(0,now+s.fade.in+s.fade.hold+s.fade.out);
    }
  }
};

const SpriteSheet=new Image()
SpriteSheet.src="./snake_hud.png";

const hud={
  soundBtn:{sx:4,sy:72,sw:[[76,1]],sh:76,dx:4,dy:cvs.height-80,alpha:0.75,count:2,i:0,inactiv:false,btnAction:"mute"},
  playBtn:{sx:4,sy:152,sw:[[156,0]],sh:76,dx:84,dy:cvs.height-80,alpha:0.75,count:1,i:0,inactiv:false,btnAction:"play"},
  homeInfo:{sx:4,sy:232,sw:[[76,1]],sh:76,dx:244,dy:cvs.height-80,alpha:0.75,count:2,i:1,inactiv:false,btnAction:"home"},
  title:{sx:164,sy:204,sw:[[504,0]],sh:188,dx:cvs.width/2-504/2,dy:cvs.height/2.5-188/2,count:1,i:0},
  gameOver:{sx:272,sy:8,sw:[[408,0]],sh:192,dx:cvs.width-408-80,dy:cvs.height/2-192/2,count:1,i:0},
  bigNum:{sx:4,sy:4,sw:[[24,0],[12,0],[24,7]],sh:40,dx:12,dy:12,alpha:0.5,count:10,i:0},
  smalNum:{sx:4,sy:48,sw:[[12,0],[4,0],[12,7]],sh:20,dx:4,dy:48,kerning:["67"],count:10,i:0},
  edge:{sx:4,sy:312,sw:[[48,0]],sh:48,dx:100,dy:84,count:2,i:1},
  infoBox:{show:false,drawInfo(){
    ctx.fillStyle="rgba(204,204,204,1)";
    ctx.fillRect(100+48,84+48,cvs.width-200-96,cvs.height-168-96);

    [[100,84,-90],[cvs.width-148,cvs.height-132,90],// corners
    [100,cvs.height-132,180],[cvs.width-148,84,0],

    [(100+cvs.width-148)/2,84,0,{x:10.3,y:1},1],// sides
    [100,(cvs.height-132+84)/2,-90,{x:7,y:1},1],
    [(cvs.width-148+cvs.width-148)/2,(cvs.height-132+84)/2,90,{x:7,y:1},1],
    [(100+cvs.width-148)/2,(cvs.height-132+cvs.height-132)/2,180,{x:10.3,y:1},1]
    ].forEach(e=>{
      hud.edge.dx=e[0];hud.edge.dy=e[1];
      if(e[4]){hud.edge.i=0}else{hud.edge.i=1}
      hud.centerDraw(hud.edge,e[2],e[3]);
    });

    ctx.font="42px Arial";
    ctx.textAlign="center";
    ctx.fillStyle="black";
    ctx.fillText("Info Pannel", cvs.width/2, 150, cvs.width-300);
    ctx.font="32px Arial";
    let text=["let me type somthing","second line"]
    for(let i=0;i<text.length;i++){
      ctx.fillText(text[i], cvs.width/2, 192+32*i, cvs.width-300);
    }
  }},

  compute(h){
    let next=0;
    let offset=0;
    let copy=h.sw[0][1];

    for(let i=0;i<h.i;i++){
      offset+=h.sw[next][0]+4;
      if(copy>0){ // chech if value(sw) counts for next one too
        copy--;
      }else{
        next++;
        next=Math.min(next,h.sw.length-1);
        copy=h.sw[next][1];
      }
    }
    return{o:offset,w:h.sw[next][0]}
  },

  draw(h){
    if(h.inactiv){return}
    h.i=Math.max(0,Math.min(h.count-1,h.i));
    let s=this.compute(h);
    if(h.alpha){ctx.globalAlpha=h.alpha;}
    ctx.drawImage(SpriteSheet,h.sx+s.o,h.sy,s.w,h.sh,h.dx,h.dy,s.w,h.sh);
    ctx.globalAlpha=1;
  },

  centerDraw(h,deg=0,scale={x:1,y:1}){
    h.i=Math.max(0,Math.min(h.count-1,h.i));
    let s=this.compute(h);
    ctx.save();
    if(h.alpha){ctx.globalAlpha=h.alpha;};
    ctx.translate(h.dx+s.w/2,h.dy+h.sh/2);
    ctx.rotate(deg*Math.PI/180);
    ctx.scale(scale.x,scale.y)
    ctx.drawImage(SpriteSheet,h.sx+s.o,h.sy,s.w,h.sh,-s.w/2,-h.sh/2,s.w,h.sh);
    ctx.restore();

  }
}
let scoreNums=[{...hud.bigNum}];
let endScore=[{...hud.smalNum}];
let highScore=[{...hud.smalNum}];
endScore[0].dx=400;endScore[0].dy=332;
highScore[0].dx=624;highScore[0].dy=192;

const clickableBtn=[hud.soundBtn,hud.playBtn,hud.homeInfo];

export const EGameState={idle:0,playing:1,pause:2,gameOver:3,state:0}
export const snake=new TSnake(ctx);
snake.snakeSkin="default";

const setTimeoutID={animateGameID:null,snakeDeathID:null,portalRotationID:null};

let apples=[{
  pos:{x:0,y:0},
  size:board.cellSize/2,
  type:"normal",
  color:null,
  destination:null
}];

export let portals=[];

//functions--------------------------------------------------
function newGame(){
  snake.newGame();
  apples=[{pos:{x:0,y:0},size:board.cellSize/2,type:"normal",color:null,destination:null}];
  randomizeApple(apples[0]);
  if(setTimeoutID.animateGameID){
    clearTimeout(setTimeoutID.animateGameID);
    setTimeoutID.animateGameID=null;
  }if(setTimeoutID.snakeDeathID){
    clearInterval(setTimeoutID.snakeDeathID);
    setTimeoutID.snakeDeathID=null;
  }if(setTimeoutID.portalRotationID){
    clearInterval(setTimeoutID.portalRotationID);
    setTimeoutID.portalRotationID=null;
  }
  portals=[];
  hud.homeInfo.i=1;
  hud.soundBtn.inactiv=false;
  hud.playBtn.inactiv=false;
  hud.homeInfo.inactiv=false;
  drawGame();
  animateGame();
}

export function drawGame(){
  for(let i=0;i<(board.cols*board.rows);i++){

    ctx.fillStyle="lightgray";
    if((Math.floor(i/board.cols)+i)%2==0){
      ctx.fillStyle="white";
    }
    ctx.fillRect(board.cellSize*(i%board.cols),board.cellSize*(Math.floor(i/board.cols)),board.cellSize,board.cellSize);
  }

  portals.forEach(e=>{
    e.entrance.draw();
    e.exit.draw();
  });

  let drawLater=[]
  if(EGameState.state!=EGameState.idle){
    apples.forEach(e=>{
      ctx.fillStyle=e.color;
      ctx.fillRect(board.cellSize*e.pos.x+e.size/2,board.cellSize*e.pos.y+e.size/2,e.size,e.size);
      if(e.destination){
        drawLater.push(()=>{
          fillOnAngle({x:e.destination.x+0.5,y:e.destination.y+0.5},{x:8,y:8},45,"rgba(170,0,170,0.5)")
        })
      }
      /*ctx.fillStyle="rgba(85,85,85,1)"; //apple stem
      let size={x:4,y:6}
      ctx.fillRect(board.cellSize*e.pos.x+(board.cellSize/2-size.x/2),board.cellSize*e.pos.y+e.size/2-size.y/2,size.x,size.y);*/ // did not like it
    });

    snake.draw();

    drawLater.forEach(e=>e());
  }

  if(EGameState.state==EGameState.pause){
    ctx.fillStyle="rgba(0,0,0,0.25)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
  else if(EGameState.state==EGameState.idle){
    hud.draw(hud.title);
    if(hud.infoBox.show){hud.infoBox.drawInfo()}
  }
  else if(EGameState.state==EGameState.gameOver){
    hud.draw(hud.gameOver);
    drawNumber(endScore,snake.length);
    drawNumber(highScore,localStorage.getItem("score"));
  }
  hud.draw(hud.soundBtn);
  hud.draw(hud.playBtn);
  hud.draw(hud.homeInfo);

  if(EGameState.state==EGameState.playing||EGameState.state==EGameState.pause){
    drawNumber(scoreNums,snake.length);
  }
}

function animateGame(){
  if(EGameState.state==EGameState.playing){

    portals.forEach(e=>{ // detect portal
      let short={
        entrance:snake.pos.x==e.entrance.pos.x&&snake.pos.y==e.entrance.pos.y,
        exit:snake.pos.x==e.exit.pos.x&&snake.pos.y==e.exit.pos.y
      }
      if(!snake.justTeleported&&short.entrance){
        snake.tp=e.entrance.destination;
        sound.makeSound("portal");
      }else if(!snake.justTeleported&&short.exit){
        snake.tp=e.exit.destination;
        sound.makeSound("portal");
      }
    })

    snake.animate();

    for(let i=0;i<portals.length;i++){ // open/close/remove portal
      if(snake.onSnake(portals[i].entrance.pos)){
        portals[i].entrance.open();
      }else{portals[i].entrance.close();}
      if(snake.onSnake(portals[i].exit.pos)){
        portals[i].exit.open();
      }else{portals[i].exit.close();}

      if(portals[i].entrance.isClosed&&portals[i].exit.isClosed){
        portals.splice(i,1);
        if(portals.length==0&&setTimeoutID.portalRotationID){
          clearInterval(setTimeoutID.portalRotationID);
          setTimeoutID.portalRotationID=null;
        }
      }
    }

    if(snake.checkCollision()){
      console.log("Collision");
      snake.setState("dead");
      hud.homeInfo.i=0;
      hud.soundBtn.inactiv=false;
      hud.playBtn.inactiv=false;
      hud.homeInfo.inactiv=false;
      EGameState.state=EGameState.gameOver;

      let count=0;
      setTimeoutID.snakeDeathID=setInterval(()=>{
        snake.passDown();
        sound.makeSound("death");
        drawGame();
        count++;
        if(count>=snake.length){
          clearInterval(setTimeoutID.snakeDeathID);
          setTimeoutID.snakeDeathID=null;
        }
      },2000/snake.length);

      console.log(`Score: ${snake.length}`);
      if(!localStorage.getItem("score")||Number(localStorage.getItem("score"))<snake.length){
        localStorage.setItem('score',snake.length);
      }
      console.log(`HightScore: ${localStorage.getItem("score")}`);
      if(snake.length>=board.cols*board.rows){
        console.log("you win!");
      }
    }

    apples.forEach(e=>{
      let canDelete=true;
      if(snake.pos.x==e.pos.x && snake.pos.y==e.pos.y){
        sound.makeSound("eat");

        if(e.type=="ghost"){
          if(snake.state!="ghost"){
            console.log("Ability: ghost");
          }
          snake.setState("ghost",true);
          snake.resetGhostTimer()

        }else if(e.type=="bonus"){
          console.log("Ability: bonus");
          let temp=apples.push({pos:{x:0,y:0},size:board.cellSize/2,type:"normal",color:null});
          canDelete=false;
          randomizeApple(apples[temp-1],canDelete);

        }else if(e.type=="portal"&&!snake.onSnake(e.destination)){
          console.log("Ability: portal");
          portals.push({
            entrance:new TPortal(ctx,e.pos,true,e.destination),
            exit:new TPortal(ctx,e.destination,false,e.pos)
          });
          if(!setTimeoutID.portalRotationID){
            setTimeoutID.portalRotationID=setInterval(()=>{
              portals.forEach(e=>{
                e.entrance.portalRotation();
                e.exit.portalRotation();
              })
              drawGame();
            },100)
          }
        }
        snake.increaseLength();
        randomizeApple(e,canDelete);
      }
    })
  }
  drawGame();
  setTimeoutID.animateGameID=setTimeout(animateGame,500/snake.length**0.4);
}

function randomizeApple(apple,canDelete=true){
  if(canDelete && apples.length>1 && Math.random()<apples.length*0.1){//0.2
    apple.type="delete";
    console.log("Deleted: apple")
    appleCleanUp();
    return;
  }

  apple.destination=null;
  let count=0;
  do{
    apple.pos.x=Math.floor(Math.random()*board.cols);
    apple.pos.y=Math.floor(Math.random()*board.rows);
    if(count>=50){ // after 50 somthing hase to change
      let found=false;
      for(let x=0;x<board.cols && !found;x++){
        for(let y=0;y<board.rows  && !found;y++){
          apple.pos.x=x;apple.pos.y=y;
          if(!snake.onSnake(apple.pos)&&!onApple(apple)){
             found=true;
          }
        }
      }
      if(!found){ // to avoid infinit loop if no valid spots
        apple.type="delete";
        console.log("Forced Deleted: apple");
        appleCleanUp();
        return;
      }
    }
    count++;
  }while(snake.onSnake(apple.pos)||onApple(apple))
  apple.type="normal";
  apple.color="rgba(170,0,0,1)";
  let rng=Math.random();
  if(rng<0.1){
    apple.type="portal";
    apple.color="rgba(170,0,170,1)";
    apple.destination=portalDestination(apple.pos)
  }else if(rng<0.3){
    apple.type="ghost";
    apple.color="rgba(0,0,85,0.5)";
  }else if(rng<0.6){
    apple.type="bonus";
    apple.color="rgba(170,170,0,0.5)";
  }
}

function portalDestination(entrance){
  let pos={x:0,y:0}
  do{
    pos.x=Math.floor(Math.random()*board.cols);
    pos.y=Math.floor(Math.random()*board.rows);
  }while(snake.onSnake(pos)||(pos.x==entrance.x&&pos.y==entrance.y))
  return pos;
}

function appleCleanUp(){
  apples=apples.filter(e=>e.type!="delete");
}

function onApple(apple){
  let bool=false;
  apples.forEach(e=>{
    if(e.pos.x==apple.pos.x && e.pos.y==apple.pos.y && e!=apple){bool=true};
  });
  return bool;
}

export function setGameTimeout(handeler, timeOut){
  let remaining=timeOut;
  let start=Date.now();
  let timerID;

  function pause(){
    clearTimeout(timerID);
    remaining-=Date.now()-start;
    console.log("Timeout: pause");
  }
  function resume(){
    start=Date.now();
    timerID=setTimeout(handeler,remaining);
    console.log("Timeout: resume");
  }
  function clear(){
    clearTimeout(timerID);
  }
  timerID=setTimeout(handeler,remaining);

  return {pause,resume,clear};
}

export function fillOnAngle(pos,dim,deg,color){
  ctx.save();
  ctx.translate(board.cellSize*(pos.x),board.cellSize*(pos.y))
  ctx.rotate(deg*Math.PI/180);
  ctx.fillStyle=color;
  ctx.fillRect(-dim.x/2,-dim.y/2,dim.x,dim.y);
  ctx.restore();
}

function drawNumber(numbers,value){
  while(value>=10**numbers.length){ // increase digets
    numbers.push({...numbers[0]});
  }
  while(value<10**(numbers.length-1) && numbers.length>1){ // decrease digets
    numbers.pop();
  }

  let digetOffset=numbers[0].dx;
  for(let i=0;i<numbers.length;i++){
    numbers[i].i=Math.floor(value/10**(numbers.length-1-i))%10;
    let checkKerning=numbers[0].kerning && i-1>=0;
    if(checkKerning && numbers[0].kerning.includes(`${numbers[i-1].i}${numbers[i].i}`)){digetOffset-=6}
    numbers[i].dx=digetOffset;
    digetOffset+=hud.compute(numbers[i]).w+4;
    hud.draw(numbers[i]);
  }
}

function onKeyDown(aEvent) {
  switch(aEvent.code){
    case "KeyW":
    case "ArrowUp":
      if(snake.direction!="down"){
        snake.newDirection="up";
      };
      break;
    case "KeyD":
    case "ArrowRight":
      if(snake.direction!="left"){
        snake.newDirection="right";
      }
      break;
    case "KeyS":
    case "ArrowDown":
      if(snake.direction!="up"){
        snake.newDirection="down";
      }
      break;
    case "KeyA":
    case "ArrowLeft":
      if(snake.direction!="right"){
        snake.newDirection="left";
      }
      break;

    case "Space":
      switch(EGameState.state){
        case EGameState.idle:
          EGameState.state=EGameState.playing;
          hud.soundBtn.inactiv=true;
          hud.playBtn.inactiv=true;
          hud.homeInfo.inactiv=true;
          break;
        case EGameState.playing:
          EGameState.state=EGameState.pause;
          hud.soundBtn.inactiv=false;
          snake.pause();
          break;
        case EGameState.pause:
          EGameState.state=EGameState.playing;
          hud.soundBtn.inactiv=true;
          snake.pause();
          break;
        case EGameState.gameOver:
          EGameState.state=EGameState.playing;
          newGame();
          hud.soundBtn.inactiv=true;
          hud.playBtn.inactiv=true;
          hud.homeInfo.inactiv=true;
          break;
      }
      drawGame();
      break;

    case "Digit1":
      snake.snakeSkin=1;
      drawGame();
      break;
    case "Digit2":
      snake.snakeSkin=2;
      drawGame();
      break;
    case "Digit3":
      snake.snakeSkin=3;
      drawGame();
      break;
    case "Digit4":
      snake.snakeSkin=4;
      drawGame();
      break;
    case "Digit5":
      snake.snakeSkin=5;
      drawGame();
      break;
    case "Digit6":
      snake.snakeSkin=6;
      drawGame();
      break;
    case "Digit7":
      snake.snakeSkin=7;
      drawGame();
      break;
    case "Digit8":
      snake.snakeSkin=8;
      drawGame();
      break;
    case "Digit9":
      snake.snakeSkin=9;
      drawGame();
      break;
    
    default:
      console.log(aEvent.code);
      break;
  }
}
function onButton(aEvent){
  let x=aEvent.offsetX;
  let y=aEvent.offsetY;
  let btn=null;
  clickableBtn.forEach(e=>{
    if((x>e.dx && x<e.dx+hud.compute(e).w)&&(y>e.dy && y<e.dy+e.sh)&&!e.inactiv){btn=e;}
  });
  return btn;
}
function onClick(aEvent){
  let button=onButton(aEvent);
  if(button){
    switch(button.btnAction){
      case "mute":
        hud.soundBtn.i=Math.abs(hud.soundBtn.i-1);
        sound.isMuted=!sound.isMuted;
        break;
      case "play":
        if(EGameState.state==EGameState.gameOver){
          newGame();
        }
        EGameState.state=EGameState.playing;
        hud.soundBtn.inactiv=true;
        hud.playBtn.inactiv=true;
        hud.homeInfo.inactiv=true;
        break;
      case "home":
        if(EGameState.state==EGameState.gameOver){
          newGame();
          EGameState.state=EGameState.idle;
        }else if(EGameState.state==EGameState.idle){
          hud.infoBox.show=!hud.infoBox.show;
          drawGame();
        }
        break;
    
      default:
        alert(`button ${e.btnAction} not correct`)
        break;
    }
    sound.makeSound("button");
    drawGame();
  }
}
let alterdBtns=[];
function onHover(aEvent){
  let button=onButton(aEvent);
  if(button){
    document.getElementById("canvas").style.cursor="url('./cursor.png') 16 16, none"//"pointer";
    if(button.alpha!=1){
      button.alpha=1;
      alterdBtns.push(button);
    }
  }else{
    document.getElementById("canvas").style.cursor="url('./cursorDot.png') 16 16, cell"//"default";
  }
  alterdBtns.forEach(e=>{
    if(e!=button){e.alpha=0.75;e=null}
  });
  for(let i=0;i<alterdBtns.length;i++){
    if(alterdBtns[i]==null){alterdBtns.splice(i,1)}
  }
  drawGame();
}

//event listener----------------------------------------------------------------------
document.addEventListener("keydown", onKeyDown);
cvs.addEventListener("click", onClick);
cvs.addEventListener("mousemove", onHover);
document.addEventListener("DOMContentLoaded", () => {
  window.clearLocalStorage = function () {
    if(!confirm("are you sure")){return}
    localStorage.clear();
    console.log("localStorage cleared");
  };
});
SpriteSheet.onload=function(){
  newGame();
};