"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Task 1, 2 and 3");
let wakeUpTime = 2;
if (wakeUpTime===7) {
  printOut("I can take the bus to school.");
}else if(wakeUpTime===8){
  printOut("I can take the train to school.")
}else{
  printOut("I have to take the car to school.");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let num=5;
let answer="positiv";
if (num<0){answer="negativ"}
else if(num===0){answer="zero"}
printOut(answer);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function rand(min,max){
  return (Math.floor(Math.random()*(max-min+1))+min)
}
let random=rand(1,8);
if(random<4){answer="image too small"}
else if(random>6){answer="image too large"}
else{answer="thank you"}
printOut(answer);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let monthList =["January", "February", "March", "April", "May",
"Jun", "Juli", "August", "September", "October", "November", "December"];
let noOfMonth = monthList.length;
let monthName = monthList[Math.floor(Math.random() * noOfMonth)];
answer="You do not need to take vitamin D"
if(monthName.includes("r")){answer="You must take vitamin D"}
printOut(answer);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
monthList=[["January","31"],["February","28 or 29"], ["March","31"], ["April","30"], ["May","31"],
["June","30"], ["Juli","31"], ["August","31"], ["September","30"], ["October","31"], ["November","30"], ["December","31"]];
noOfMonth = monthList.length;
monthName = monthList[Math.floor(Math.random() * noOfMonth)];
answer="You do not need to take vitamin D"
if(monthName[0].includes("r")){answer="You must take vitamin D"}
printOut([answer,monthName[1]]);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let month = "May"
let status="Gallery is open as usual."
if (month==="May" || month==="March"){status = "Gallery is closed for refurbishment."}
else if (month === "April"){status = "Gallery is open in temporary premises next door."}
printOut(status);
printOut(newLine);
