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

<ul id="list-items"> </ul>

</div>`;

let elementsContainer = document.getElementById('list-items')
let Leadrbtn = document.getElementById("btnb");


Leadrbtn.addEventListener("click", () => {
 
let Lead = new ScoreSave();
Lead.leaderBoard();

});


export function theValues(value) {
  
  for (let i = 0; i < value.length; i++) {
    elementsContainer.innerHTML = `<li>name: ${value[i].user} score: ${value[i].score} </li>`
  }
  
}
