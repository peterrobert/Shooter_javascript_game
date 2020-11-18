import { Initialize } from "./gameScene";
import { ScoreSave } from "./score";

let container = document.getElementById("my-game");

let name;
container.innerHTML = `
<form id = "nameForm">
  <label for="fname">Please Enter Your name:</label>
  <input type="text" id="fname" name="fname" required><br><br>
  <input type="submit" value="Submit" id="sub-btn"">
</form>
`;

let SubmitName = document.getElementById("nameForm");
SubmitName.addEventListener("submit", () => {
  name = document.getElementById("fname").value;
  container.innerHTML = "";

  Initialize(name);
});

let buttonContainer = document.getElementById("leader_board");
buttonContainer.innerHTML = `<button id="btnb">Leaders Board</button>
<div id="leader_show">


</div>`;

let Leadrbtn = document.getElementById("btnb");
let elementsContainer = document.getElementById("leader_show");

Leadrbtn.addEventListener("click", () => {
  let Lead = new ScoreSave();
  Lead.leaderBoard();

  Leadrbtn.disabled = "disabled";
});

export function theValues(value) {
 try {

   let rValues = value.result
  
  let ulContainer = document.createElement("ul");
  for (let i = 0; i < rValues.length; i++) {

    let listContainers = document.createElement("li");
    listContainers.innerText = `name: ${ rValues[i].user}      score: ${ rValues[i].score}`;

    ulContainer.appendChild(listContainers)
    
  }
  elementsContainer.append(ulContainer);
   
 } catch (error) {
   console.log(error);
 }

 
}
