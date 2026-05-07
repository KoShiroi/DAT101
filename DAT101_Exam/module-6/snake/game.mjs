"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import { TSpriteCanvas } from "libSprite";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.js";
import { TSnake, EDirection } from "./snake.js";
import { TBait } from "./bait.js";
import { TMenu } from "./menu.js";
import { TPoint } from "lib2d";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier;
let hndUpdateGame = null;
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };



// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 },
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const center=new TPoint((GameBoardSize.Cols*SheetData.Head.width)/2,(GameBoardSize.Rows*SheetData.Head.height)/2)
export const GameProps = {
  gameBoard: null,
  gameStatus: EGameStatus.Idle,
  snake: null,
  bait: null,
  menu: null
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 0; // Reset game speed
  GameProps.gameStatus = EGameStatus.Playing;
}
export function returnHome(){
  GameProps.gameStatus=EGameStatus.Idle
}

export function baitIsEaten() {

  console.log("Bait eaten! +"+GameProps.bait.value);
  /* Logic to increase the snake size and score when bait is eaten */
  GameProps.snake.increaseSnake();
  GameProps.menu.score=GameProps.menu.score+GameProps.bait.value;
  GameProps.bait.update();

  increaseGameSpeed(); // Increase game speed
}


//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;
  console.log(cvs.width)

  GameProps.gameStatus = EGameStatus.Idle; // change game status to Idle

  /* Create the game menu here */ 
  GameProps.menu=new TMenu(spcvs,SheetData);

  requestAnimationFrame(drawGame);
  console.log("Game canvas is rendering!");
  hndUpdateGame = setTimeout(updateGame, 1000/(gameSpeed+5)**0.75); // Update game every 1000/(gameSpeed+3)**0.6
  console.log("Game canvas is updating!");
}

function drawGame() {
  // Clear the canvas
  spcvs.clearCanvas();

  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
    case EGameStatus.Pause:
      GameProps.bait.draw();
      GameProps.snake.draw();
      break;
  }

  GameProps.menu.draw()
  // Request the next frame
  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game logic here
  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:

      if (!GameProps.snake.update()) {
        GameProps.gameStatus = EGameStatus.GameOver;
        GameProps.menu.gameOver();
        console.log("Game over!");
      }
      break;
  }
  setTimeout(updateGame, 1000/(gameSpeed+5)**0.75);
}

function increaseGameSpeed() {
  /* Increase game speed logic here */
  gameSpeed += 1
  console.log("Increase game speed!",1000/(gameSpeed+5)**0.75);
}


//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
      console.log("Space key pressed!");
      /* Pause the game logic here */
      if(GameProps.gameStatus==EGameStatus.Playing){
        GameProps.gameStatus=EGameStatus.Pause;
      }else if(GameProps.gameStatus==EGameStatus.Pause){
        GameProps.gameStatus=EGameStatus.Playing;
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteImage("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);
