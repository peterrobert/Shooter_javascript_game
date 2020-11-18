/* eslint-disable import/no-cycle, import/prefer-default-export, no-console, no-plusplus */
import { Initialize } from './gameScene';
import { ScoreSave } from './score';
window.onload = () =>{
let container = document.getElementById('my-game');

let name;

  container.innerHTML = `<form id = "nameForm">
  <label for="fname">Please Enter Your name:</label>
  <input type="text" id="fname" name="fname" required><br><br>
  <input type="submit" value="Submit" id="sub-btn"">
</form>
`;



const SubmitName = document.getElementById('nameForm');
SubmitName.addEventListener('submit', () => {
  name = document.getElementById('fname').value;
  container.innerHTML = '';

  Initialize(name);
});

const buttonContainer = document.getElementById('leader_board');
buttonContainer.innerHTML = `<button id="btnb">Leaders Board</button>
<div id="leader_show">


</div>`;

const Leadrbtn = document.getElementById('btnb');
const elementsContainer = document.getElementById('leader_show');

Leadrbtn.addEventListener('click', () => {
  const Lead = new ScoreSave();
  Lead.leaderBoard();

  Leadrbtn.disabled = 'disabled';
});

}
export function theValues(value) {
  try {
    const rValues = value.result;

    const ulContainer = document.createElement('ul');
    for (let i = 0; i < rValues.length; i++) {
      const listContainers = document.createElement('li');
      listContainers.innerText = `name: ${rValues[i].user}      score: ${rValues[i].score}`;

      ulContainer.appendChild(listContainers);
    }
    elementsContainer.append(ulContainer);
  } catch (error) {
    console.log(error);
  }
}
