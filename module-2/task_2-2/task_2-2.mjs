"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const answer1_1=2+3*2-4*6;
const answer1_2=2+3*(2-4)*6;

printOut([answer1_1,answer1_2]);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const meters=25;
const centimeters=34;
const millimeters=(centimeters*10)+(meters*1000);
const inches=millimeters/25.4;

printOut(inches.toFixed(2));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let days=3;
let hours=12; //3*24+12=72+12=84
let minutes=14; //84*60=5040
let seconds=45;
minutes+=(84*60)+(45/60)

printOut(minutes);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

minutes=6322.52
days=((minutes-(minutes%(60*24)))/(60*24));
minutes=minutes%(60*24);
hours=((minutes-(minutes%(60)))/(60));
minutes=minutes%(60);
seconds=(minutes-Math.floor(minutes))*60;
minutes=Math.floor(minutes)

printOut([days+"d",hours+"h",minutes+"m",seconds.toFixed(2)+"s"]);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const exchangeRate=8.6/76;

printOut(["54$ to "+(54/exchangeRate).toFixed(0)+"Kr"]);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const part6Text="There is much between heaven and earth that we do not understand."

printOut([part6Text.length,part6Text[19],part6Text.slice(35,(35+8)),part6Text.search("earth")]);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut([5>3,7>=7,"a">"b","1">"a","2500"<"abcd","arne"!="thomas",(2===5)===true,("abcd">"bcd")===false]);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut([Number("254"),Number("57.23"),parseInt("25 kroner")]);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const r=Math.floor(Math.random()*360)+1;

printOut(r);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/

days=131
const weeks=(days-days%7)/7

printOut([weeks,days%7]);
printOut(newLine);