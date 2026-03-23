"use strict";
import { TPoint } from "lib2d";
import { TMenu, EActionType, EColorType, EShapeType, EStrokeSizeType } from "./menu.js";
import { newShapeType } from "./paint.mjs";

// 🖼️ Access the paint canvas and drawing context
const cvsPaint = document.getElementById("cvsPaint");
const ctxPaint = cvsPaint.getContext("2d");

let shape=null;
let shapes=[];
let mousePos=new TPoint()

let shapeNo=0;
let selectedHtmlShape=null;

class TShape{
  #aName
  constructor(aXStart,aYStart,aName){
    this.posStart=new TPoint(aXStart,aYStart);
    this.posEnd=null;
    this.lineWidth=newShapeType.StrokeSize;
    this.strokeStyle=newShapeType.StrokeColor;
    this.fillStyle=newShapeType.FillColor;
    this.#aName=aName;
    this.htmlID=`shape-${shapeNo++}`
  }
  setEndPos(aXEnd,aYEnd){
    this.posEnd=new TPoint(aXEnd,aYEnd);
    const div=document.createElement("div");
    div.name="paint-shape-obj";
    div.classList.add("paintObject");
    div.id=this.htmlID;
    div.onclick=selectShape;
    div.appendChild(
      document.createTextNode(this.#aName)
    )
    paintObjectList.prepend(div);

  }
  draw(){
    ctxPaint.lineWidth=this.lineWidth;
    ctxPaint.strokeStyle=this.strokeStyle;
    ctxPaint.fillStyle=this.fillStyle;
  }
}

class TLineShape extends TShape{
  constructor(aX,aY){
    super(aX,aY, "Line");
  }
  draw(){
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x,this.posStart.y)
    if(this.posEnd){
      ctxPaint.lineTo(this.posEnd.x,this.posEnd.y);
    }else{
      ctxPaint.lineTo(mousePos.x,mousePos.y);
    }
    ctxPaint.stroke();
  }
}

class TCircleShape extends TShape{
  #radius
  constructor(aX,aY){
    super(aX,aY,"Circle");
    this.#radius=0
  }
  #calcRadius(){
    const dx=mousePos.x-this.posStart.x;
    const dy=mousePos.y-this.posStart.y;
    const hyp=(dx**2+dy**2)**(1/2);
    this.#radius=hyp;
  }

  draw(){
    super.draw();
    ctxPaint.beginPath();
    if(!this.posEnd){
      this.#calcRadius();
    }
    ctxPaint.arc(this.posStart.x,this.posStart.y,this.#radius,0,2*Math.PI);
    ctxPaint.fill();
    ctxPaint.stroke();
  }
}

class TEllipseShape extends TShape{
  #radius1
  #radius2
  constructor(aX,aY){
    super(aX,aY,"Oval");
    this.#radius1=0;
    this.#radius2=0;
  }
  #calcRadius(){
    const dx=mousePos.x-this.posStart.x;
    const dy=mousePos.y-this.posStart.y;
    const hyp=(dx**2+dy**2)**(1/2);
    this.#radius1=Math.abs(dx);
    this.#radius2=Math.abs(dy);
  }

  draw(){
    super.draw();
    ctxPaint.beginPath();
    if(!this.posEnd){
      this.#calcRadius();
    }
    ctxPaint.ellipse(this.posStart.x,this.posStart.y,this.#radius1,this.#radius2,0,0,2*Math.PI);
    ctxPaint.fill();
    ctxPaint.stroke();
  }
}

class TRectangleShape extends TShape{
  #hight
  #width
  constructor(aX,aY){
    super(aX,aY,"Rectangle");
    this.#hight=0;
    this.#width=0;
  }
  #calcSize(){
    this.#hight=mousePos.y-this.posStart.y;
    this.#width=mousePos.x-this.posStart.x;
  }

  draw(){
    super.draw();
    ctxPaint.beginPath();
    //ctxPaint.moveTo(this.posStart.x,this.posStart.y)
    if(!this.posEnd){
      this.#calcSize();
    }
    ctxPaint.rect(this.posStart.x,this.posStart.y,this.#width,this.#hight);
    ctxPaint.fill();
    ctxPaint.stroke();
  }
}

class TPenShape extends TShape{
  #points;
  constructor(aX,aY){
    super(aX,aY,"Free Shape");
    this.#points=[];
  }

  addPos(aX,aY){
    const pos=new TPoint(aX,aY);
    this.#points.push(pos);
  }

  draw(){
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x,this.posStart.y)

    this.#points.forEach(element => {
      ctxPaint.lineTo(element.x,element.y);
    });

    if(this.posEnd){
      ctxPaint.lineTo(this.posEnd.x,this.posEnd.y);
    }
    ctxPaint.stroke();
    //ctxPaint.fill();
  }
}

class TPolugonShape extends TShape{
  #points;
  constructor(aX,aY){
    super(aX,aY,"Polugon");
    this.#points=[];
  }

  addPos(aX,aY){
    const pos=new TPoint(aX,aY);
    this.#points.push(pos);
  }

  draw(){
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x,this.posStart.y)

    this.#points.forEach(element => {
      ctxPaint.lineTo(element.x,element.y);
    });

    if(this.posEnd){
      ctxPaint.lineTo(this.posEnd.x,this.posEnd.y);
    }else{
      ctxPaint.lineTo(mousePos.x,mousePos.y);
    }
    ctxPaint.fill();
    ctxPaint.stroke();
  }
}

function updateMousePos(aEvent){
  const rect=cvsPaint.getBoundingClientRect();
  mousePos.x=aEvent.clientX-rect.left;
  mousePos.y=aEvent.clientY-rect.top;
  if((shape!=null)&&(newShapeType.ShapeType==EShapeType.Pen)){
    shape.addPos(mousePos.x,mousePos.y);
  }
}

function onMouseDown(aEvent){
  updateMousePos(aEvent);
  if(shape===null){
    switch(newShapeType.ShapeType){
      case EShapeType.Line:
        shape=new TLineShape(mousePos.x,mousePos.y);
        break;
      case EShapeType.Circle:
        shape=new TCircleShape(mousePos.x,mousePos.y);
        break;
      case EShapeType.Oval:
        shape=new TEllipseShape(mousePos.x,mousePos.y);
        break;
      case EShapeType.Rectangle:
        shape=new TRectangleShape(mousePos.x,mousePos.y);
        break;
      case EShapeType.Pen:
        shape=new TPenShape(mousePos.x,mousePos.y);
        break;
      case EShapeType.Polygon:
        shape=new TPolugonShape(mousePos.x,mousePos.y);
        break;
      default:
        break;
    }
  }else if(newShapeType.ShapeType==EShapeType.Polygon){
    const dx=mousePos.x-shape.posStart.x;
    const dy=mousePos.y-shape.posStart.y;
    const hyp=(dx**2+dy**2)**0.5
    if(hyp<20){
      shape.setEndPos(shape.posStart.x,shape.posStart.y);
      shapes.push(shape)
      shape=null;
    }else{
      shape.addPos(mousePos.x,mousePos.y)
    }
  }
}
function onMouseMove(aEvent){
  updateMousePos(aEvent);
}
function onMouseUp(aEvent){
  updateMousePos(aEvent)
  if(shape){
    if(newShapeType.ShapeType==EShapeType.Polygon){return;}
    shape.setEndPos(mousePos.x,mousePos.y);
    shapes.push(shape)
    shape=null;
  }
}

function drawCanvas(){
  ctxPaint.clearRect(0,0,cvsPaint.clientWidth,cvsPaint.clientHeight)
  if(shape){
    shape.draw();
  }
  shapes.forEach(element => {
    element.draw()
  });
  requestAnimationFrame(drawCanvas);
}

export function newDrawing(){
  paintObjectList.innerHTML="";
  shapes=[];
}
export function deleteShape(){
  paintObjectList.removeChild(selectedHtmlShape);
  shapes.splice(shapes.findIndex(element => element.htmlID == selectedHtmlShape.id),1)
}

export function moveUp(){
  for(let i=0;i<shapes.length;i++){
    if(shapes[i].htmlID==selectedHtmlShape.id&&i<shapes.length-1){
      let temp=shapes.splice(i,1,shapes[i+1])[0]
      shapes.splice(i+1,1,temp)
      paintObjectList.insertBefore(selectedHtmlShape.nextSibling,selectedHtmlShape)
    }
  }
}

export function moveDown(){
  for(let i=0;i<shapes.length;i++){
    if(shapes[i].htmlID==selectedHtmlShape.id&&i>0){
      let temp=shapes.splice(i,1,shapes[i-1])[0]
      shapes.splice(i-1,1,temp)
      console.log(paintObjectList)
      paintObjectList.insertBefore(selectedHtmlShape,selectedHtmlShape.previousSibling);
    }
  }
}

function selectShape(aEvent){
  if(selectedHtmlShape){
    selectedHtmlShape.classList.remove("selected")
  }
  selectedHtmlShape=aEvent.target;
  selectedHtmlShape.classList.add("selected")
}



cvsPaint.addEventListener("mousedown",onMouseDown);
cvsPaint.addEventListener("mousemove",onMouseMove);
cvsPaint.addEventListener("mouseup",onMouseUp);
drawCanvas();