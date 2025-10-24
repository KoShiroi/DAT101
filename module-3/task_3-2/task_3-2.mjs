"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let answer="";
for(let i=-10;i<=10;i++){// or (let i=1;i>0;i+=x) x er 1 helt til "i" når 11 hvor x blir -1 og en <br> blir lagt til
  if(i!=0){answer+=Math.abs(i).toString()+" ";}
  else{answer+="<br>";}
} 
printOut(answer);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let numberToGuess=45;
while((Math.floor(Math.random()*60)+1)!=numberToGuess){}
printOut(numberToGuess);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
numberToGuess=45;
let attempts=0
let befor=Date.now()
while((Math.floor(Math.random()*1000000)+1)!=numberToGuess){attempts++}
let after=Date.now()
printOut([attempts,after-befor]);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
answer=""
for(let i=1;i<200;i++){
  let isPrime=true
  if(i <= 1){}
  else if(i === 2){
    answer+=i.toString()+" ";
  }
  else if(i % 2 != 0){
    for(let num = 3; num < i; num += 2){
      if(i % num === 0){isPrime=false;break;}
    }
    if(isPrime){answer+=i.toString()+" ";}
  }
}
printOut(answer);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
answer="";
for(let r=0;r<7;r++){
  for(let c=0;c<9;c++){
    answer+=" c"+(c+1)+"r"+(r+1);
  }
  answer+=newLine;
}
printOut(answer);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function rng(min, max){
  return(Math.floor(Math.random()*(max-min+1))+min)
}
answer="";
let grade=0;
for(let i=0;i<5;i++){
  grade=rng(1,236);
  switch(true){
    case(89<=(((grade-1)/235)*100)):
      answer+="A";
      break;
    case((77<=(((grade-1)/235)*100))&&((((grade-1)/235)*100)<89)):
      answer+="B";
      break;
    case((65<=(((grade-1)/235)*100))&&((((grade-1)/235)*100)<77)):
      answer+="C";
      break;
    case((53<=(((grade-1)/235)*100))&&((((grade-1)/235)*100)<65)):
      answer+="D";
      break;
    case((41<=(((grade-1)/235)*100))&&((((grade-1)/235)*100)<53)):
      answer+="E";
      break;
    case((((grade-1)/235)*100)<41):
      answer+="F";
      break;
    default:
      break;
  }
}
/*let lastLet=answer[0];
let c=0
while(true){
  console.log(answer,answer[c+1],lastLet);
  c++;  //<--my perferd coding language
  if(answer[c]<lastLet){
    answer[c-1]=answer[c];                  å ikke bruke arrey er stupid
    answer[c]=lastLet;
    c=0;
    lastLet=answer[0]
  }else{lastLet=answer[c]}
  if(c>=answer.length-1){break;}
}*/
let oldAnswer=answer;
answer="";
for(let i=0;i<6;i++){
  switch(i){
    case(0):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="A"){answer+="A"}
    }
    break;
    case(1):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="B"){answer+="B"}
    }
    break;
    case(2):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="C"){answer+="C"}
    }
    break;
    case(3):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="D"){answer+="D"}
    }
    break;
    case(4):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="E"){answer+="E"}
    }
    break;
    case(5):
    for(let ii=0;ii<5;ii++){
      if(oldAnswer[ii]==="F"){answer+="F"}
    }
    break;
  }
}
printOut(answer);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let throws=0;
let rolls=[];
let continu=true;
let complited=0;
let pairs3=true;
answer=[];
function count(arr){
  const counts = {};
  arr.forEach(function(x){counts[x]=(counts[x]||0)+1;});
  return(counts)
}
do{
  continu=true;
  throws=0;
  do{
    rolls=[];
    pairs3=true;
    for(let dice=0;dice<6;dice++){
      rolls.push(rng(1,6));
    }
    throws++;
    switch(complited){
      case(0):
        if(rolls.sort().join("")==="123456"){continu=false;complited++;answer.push(rolls.join("")+" | full straight on "+String(throws)+" trys");}
        break;
      case(1):
        if(Object.keys(count(rolls)).length===3){
          Object.keys(count(rolls)).forEach(function(v,i,a){if(count(rolls)[v]!=2){pairs3=false}});
          if(pairs3==true){continu=false;complited++;answer.push(rolls.sort().join("")+" | 3 pairs on "+String(throws)+" trys");}
        }
        break;
      case(2):
        if(Object.keys(count(rolls)).length===2){
          Object.keys(count(rolls)).forEach(function(v,i,a){if(count(rolls)[v]!=2&&count(rolls)[v]!=4){pairs3=false}});
          if(pairs3==true){continu=false;complited++;answer.push(rolls.sort().join("")+" | towers on "+String(throws)+" trys");}
        }
        break;
      case(3):
        if(new Set(rolls).size===1){continu=false;complited++;answer.push(rolls.join("")+" | one of a kind on "+String(throws)+" trys");}
        break;
    }
  }while(continu);
}while(complited<4);
printOut(answer);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
