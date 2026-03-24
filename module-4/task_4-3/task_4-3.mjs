"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
document.getElementById("cmbTask1Calculate").addEventListener("click",()=>{
  const height=document.getElementById("txtRectHeight").value;
  const width=document.getElementById("txtRectWidth").value;
  document.getElementById("txtTask1Output").innerHTML=`Circumference = ${height*2+width*2}, Area = ${height*width}`
})


//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
let task2Words=[];
const txtTask2Word=document.getElementById("txtTask2Word");

txtTask2Word.addEventListener("keypress",(e)=>{
  if(e.key!="Enter"){return;}
  task2Words.push(txtTask2Word.value);
  txtTask2Word.value="";
  document.getElementById("txtTask2Output").innerHTML=`Number of words = ${task2Words.length} <br>Words = ${task2Words}`
})

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
let checked=[]
document.getElementById("cmbTask3CheckAnswer").addEventListener("click",()=>{
  document.querySelectorAll("input[name=chkTask3]").forEach((e)=>{
    console.log(e.checked);
    if(e.checked){
      checked.push(e.value)
    }
  })
  console.log("checked:",checked)
})

//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
for(let i=0;i<CarTypes.length;i++){
  const radioInput=document.createElement("input");
  const radioLabel=document.createElement("label");
  radioInput.type="radio";
  radioInput.name="carTypes";
  radioInput.id=CarTypes[i].caption+"ID"+i;
  radioInput.value=CarTypes[i].value;

  radioLabel.htmlFor=CarTypes[i].caption+"ID"+i;
  radioLabel.innerHTML= CarTypes[i].caption+"<br>";
  document.getElementById("divTask4Cars").appendChild(radioInput);
  document.getElementById("divTask4Cars").appendChild(radioLabel);
}

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
document.getElementById("selectTask5Animals").addEventListener("change",(e)=>{
  document.getElementById("txtTask5Output").innerHTML=e.target.options[e.target.selectedIndex].text;
})

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
GirlsNames.forEach((e)=>{
  const option=document.createElement("option");
  option.innerHTML=e
  document.getElementById("selectTask6Girls").appendChild(option);
})
document.getElementById("selectTask6Girls").addEventListener("change",(e)=>{
  document.getElementById("txtTask6Output").innerHTML="You selected: "+e.target.options[e.target.selectedIndex].text;
})

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
MovieGenre.forEach((e)=>{
  const option=document.createElement("option");
  option.innerHTML=e
  document.getElementById("selectMovieGenre").appendChild(option);
})
let num=1
document.getElementById("cmbAddMovie").addEventListener("click",(e)=>{
  let movie=[document.getElementById("txtMovieTitle").value,
  document.getElementById("selectMovieGenre").value,
  document.getElementById("txtMovieDirector").value,
  document.getElementById("txtMovieRate").value];
  const tr=document.createElement("tr");
  tr.innerHTML=`
    <th>${num++}</th>
    <th>${movie[0]}</th>
    <th>${movie[1]}</th>
    <th>${movie[2]}</th>
    <th>${movie[3]}</th>`
  
    document.getElementById("tblMovies").appendChild(tr)

})
