"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let d={
  day:"numeric",
  weekday:"long",
  month:"long",
  year:"numeric"
}
function date(){
  return(new Date().toLocaleDateString("no-NB",d));
}
printOut(date());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function daysUntil(dateString){
  const targetDate = new Date(dateString);
  const milliseconds = targetDate.getTime() - new Date().getTime();
  if(milliseconds>0){
    const days=Math.floor(milliseconds/(24*60*60*1000));
    printOut("days until 2XKO: "+days);
  }else{
    printOut("date has already passed.");
  }
}
printOut("curent date: "+date())
daysUntil('May, 14, 2026')
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function circle(r){
  let circleArea=Math.PI*(r**2);
  let circleCircumfrence=Math.PI*r*2;
  let circleDiameter=r*2;
  return(["A:"+String(circleArea),"C:"+String(circleCircumfrence),"D:"+String(circleDiameter)]);
}
printOut(circle(7));
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function rectangle(w,h){
  let rCircumfrence=(w+h)*2;
  let rArea=w*h;
  return(["C:"+String(rCircumfrence),"A:"+String(rArea)]);
}
printOut(rectangle(5,7));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function temp(num,type){
  let c,f,k
  switch(type){
    case("c"):
      f=num*(9/5)+32;
      k=num+273.15;
    return(["c:"+String(Math.trunc(num)),"f:"+String(Math.trunc(f)),"k:"+String(Math.trunc(k))]);
    case("f"):
      c=(num-32)*(5/9);
      k=(num-32)*(5/9)+273.15;
    return(["c:"+String(Math.trunc(c)),"f:"+String(Math.trunc(num)),"k:"+String(Math.trunc(k))]);
    case("k"):
      c=num-273.15;
      f=(num-273.15)*(9/5)+32;
    return(["c:"+String(Math.trunc(c)),"f:"+String(Math.trunc(f)),"k:"+String(Math.trunc(num))]);
  }
  return(nil);
}
printOut([temp(21,"c"),temp(45,"f"),temp(-3,"c")]);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function price(ga,tg){
  let t;
  switch(tg.toLowerCase()){
    case "normal":
    t=25;
    break;
    case "food":
    t=15;
    break;
    case"hotel","transport","cinema":
    t=10;
    break;
    default:
      return("Unknown VAT group!")
  }
  return((100*ga)/(t+100))
}
printOut([price(200,"FOOD"),price(50,"normal"),price(350,"cinema"),price(500,"goblin")]);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function sdt(speed="m",distance="m",time="m"){
  if(speed=="m"&&(distance!="m"&&time!="m")){
    return("speed="+distance/time);
  }
  else if(distance=="m"&&(speed!="m"&&time!="m")){
    return("distance="+speed*time);
  }
  else if(time=="m"&&(speed!="m"&&distance!="m")){
    return("time="+distance/speed);
  }
  else{return(NaN);}
}
printOut(sdt(undefined,7,3));
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function part8(ts,ms,tc,bool){
  while(ts.length<ms){
    if(bool){
      ts+=tc;
    }else{
      ts=tc+ts;
    }
  }
  return(ts);
}

printOut(part8("a string for testing",23,"_",false));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let part9=[]
let test=[1,2]
let break_in_math=false
function sum(array){
  let total=0;
  for(let i=0;i<array.length;i++){
    total+=array[i]
  }
  return(total);
}
function split(array){
  let array1=[],array2=[]
  for(let i=0;i<array.length;i++){
    if(i<((array.length+1)/2)){
      array1.push(array[i]);
    }else{
      array2.push(array[i]);
    }
  }
  return([array1,array2])
}
for(let i=3;i<200;i++){
  test.push(i);
  if(test.length%2!=0){
    if(sum(split(test)[0])==sum(split(test)[1])){
      part9.push([split(test)[0],"=",split(test)[1]].join(" "));
      test=[];
    }else if(sum(split(test)[0])<sum(split(test)[1])){
      printOut("it fails at ",i)
      break_in_math=true
    }
  }
}
printOut(part9);
if(!break_in_math){
  printOut("Maths fun!")
}
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function factorial(num){
  for(let i=num-1;i>0;i--){
    num=num*(i);
  }
  return(num);
}
printOut(factorial(9));
printOut(newLine);
