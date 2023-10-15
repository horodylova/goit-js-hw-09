const buttonStart = document.querySelector('[data-start]');
const buttonEnd = document.querySelector('[data-stop]');

const containerDiv = document.createElement("div");
containerDiv.appendChild(buttonStart);
containerDiv.appendChild(buttonEnd);

containerDiv.style.position = "absolute";
containerDiv.style.left = "50%";
containerDiv.style.top = "50%";

let intervalId = null; 
let isColorChanging = false; 

document.body.appendChild(containerDiv);



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function changeBackgroundColor() {
    if(!isColorChanging) {
        isColorChanging = true;
    }
    document.body.style.backgroundColor = getRandomHexColor();
    isColorChanging = false;
}

buttonStart.addEventListener("click", () => {
    buttonStart.disabled = true;
    intervalId = setInterval(changeBackgroundColor, 1000); // Меняем цвет каждую секунду
  });

  buttonEnd.addEventListener('click', () => {
    buttonStart.disabled = false;
    clearInterval(intervalId);
  });
