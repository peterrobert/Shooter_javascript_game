import {Initialize} from "./gameScene";

let container = document.getElementById('my-game');

let name
container.innerHTML = `
<form id = "nameForm">
  <label for="fname">Please Enter Your name:</label>
  <input type="text" id="fname" name="fname" required><br><br>
  <input type="submit" value="Submit" id="sub-btn"">
</form>
`

let SubmitName = document.getElementById('nameForm');
SubmitName.addEventListener('submit', () => {
  name = document.getElementById('fname').value;
  container.innerHTML = '';

   Initialize(name);
})

