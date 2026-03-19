"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const part1Array=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
for(let i=0;i<part1Array.length;i++){
  printOut(part1Array[i]);
}
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(part1Array.join("|"));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function arrayLoop(array){
  for(let i=0;i<array.length;i++){
    printOut(`${array[i].length}:${i}:${array[i]}`);
  }
}

const part3Text="Hei på deg, hvordan har du det?"
arrayLoop(part3Text.split(" "));

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function arrayRemove(array,remove){
  let removeIndex=array.indexOf(remove)
  if(removeIndex>-1){
    return array.splice(removeIndex,1);
  }else{
    return "not found";
  }
}

const part4Names=["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
"Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"]
printOut(`removed ${arrayRemove(part4Names,"Maria")}`);
printOut(part4Names)
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const part5Names=["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah",
"Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor",
"Magnus"]
const allNames=part4Names.concat(part5Names);
console.log(allNames)
printOut(allNames);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class TBook{
  #Title
  #Author
  #ISBN
  constructor(aTitle,aAuthor,aISBN){
    this.#Title=aTitle;
    this.#Author=aAuthor;
    this.#ISBN=aISBN;
  }
  toString(){
    return `Title:${this.#Title}, Auther:${this.#Author}, ISBN:${this.#ISBN}`
  }
}
const part6Array=[
  new TBook("titel1","author1","ISBN1"),
  new TBook("titel2","author2","ISBN2"),
  new TBook("titel3","author3","ISBN3")
]
for(let i=0;i<part6Array.length;i++){
  printOut(`${part6Array[i]}`);
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const EWeekDays={
  WeekDay1:{value:0x01,name:"Mandag"},
  WeekDay2:{value:0x02,name:"Tirsdag"},
  WeekDay3:{value:0x04,name:"Onsdag"},
  WeekDay4:{value:0x08,name:"torsdag"},
  WeekDay5:{value:0x10,name:"fredag"},
  WeekDay6:{value:0x20,name:"lørdag"},
  WeekDay7:{value:0x40,name:"søndag"},
  WorkDays:{value:0x01+0x02+0x04+0x08+0x10,name:"Arbeidsdager"},
  Weekends:{value:0x20+0x40,name:"Helg"},
}
const part7Array=Object.keys(EWeekDays);
for(let i=0;i<part7Array.length;i++){
  const item=EWeekDays[part7Array[i]];
  printOut(`${item.value} : ${item.name}`);
}

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let part8Array = Array.from({ length: 35 }, () => Math.floor(Math.random() * 20) + 1); //got from internet

const ascending = [...part8Array].sort(function(a, b) {
    return a - b;
});
const descending = [...part8Array].sort(function(a, b) {
    return b - a;
});
printOut(`${ascending}:${descending}`);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const frequency = {}; 
const answer={};
part8Array = part8Array.map(Number);
part8Array.forEach(num => { frequency[num] = (frequency[num] || 0) + 1; });
const sortedEntries = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
sortedEntries.forEach(([value, count]) => {
    printOut(`${value}: ${count}`);
});
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const table=[]
for(let col=0;col<9;col++){
  let rows=[];
  for(let row=0;row<9;row++){
    rows.push(`col:${col} | row:${row}`)
  }
  table.push(rows)
}
printOut(table);
printOut(newLine);
