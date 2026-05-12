"use strict";

import {board, EGameState, setGameTimeout, snake, fillOnAngle, drawGame} from "./main.mjs"

export class TPortal{
  #ctx
  #open
  #layers
  #destination
  constructor(ctx,pos,open=false,destination){
    this.#ctx=ctx
    this.#open=open;
    this.pos={x:pos.x,y:pos.y};
    const portalSize=(board.cellSize**2+board.cellSize**2)**0.5;
    this.#layers=[
      {dim:{x:portalSize,y:portalSize},deg:45,color:"rgba(170,0,170,0.25)"},
      {dim:{x:portalSize/1.3,y:portalSize/1.3},deg:45,color:"rgba(170,0,170,0.25)"}
    ]
    this.#destination={x:destination.x,y:destination.y};
  }
  draw(){
    if(!this.#open){return}
    this.#layers.forEach(e=>{
      fillOnAngle({x:this.pos.x+0.5,y:this.pos.y+0.5},e.dim,e.deg,e.color);
    });
  }
  portalRotation(){
    this.#layers[0].deg+=30;
    this.#layers[1].deg-=15;
  }
  onPortal(pos){
    return this.pos.x==pos.x&&this.pos.y==pos.y
  }
  open(){
    this.#open=true;
  }
  close(){
    this.#open=false;
  }
  get isClosed(){
    return !this.#open;
  }
  get destination(){
    return this.#destination;
  }
}