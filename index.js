const cells = document.querySelectorAll(".cell");
const imageCells = document.querySelectorAll(".img-cell");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
const statusText = document.querySelector(".status-text");
const timeText = document.querySelector(".time");
const gameOver = document.querySelector(".loser");
console.log(gameOver);
const imgArr = [
  "./images/arrow-down.png",
  "./images/arrow-up.png",
  "./images/here.png",
  "./images/left.png",
  "./images/right.png",
  "./images/up-1.png",
  "./images/up.png",
];

//Adding opacity to the cells
let start;
function addOpacity() {
  imageCells.forEach((img) => img.classList.add("opacity"));
}
// timer count down
let timer = 10;
let timerFunc;
function countDown() {
  timerFunc = setInterval(function () {
    timer--;
    timeText.textContent = "00:" + timer;
    if (timer < 1) {
      timer = 0;
      clearInterval(timerFunc);
      cells.forEach((cell) => cell.removeEventListener("click", cellClicked));
      gameOver.textContent = "You were too slow! Game Over!";
    }
  }, 1000);
}
//Adding backgrounds
function cellBackgrounds() {
  start = true;
  const randomIndex = Math.floor(Math.random() * imgArr.length);
  const randomImage = imgArr[randomIndex];
  for (const img of imageCells) {
    img.setAttribute("src", randomImage);
  }

  const removedImgArr = [];
  const imgLength = 8;
  for (let i = 0; i < imgLength; i++) {
    const randomNum = Math.floor(Math.random() * imageCells.length);
    const removedImageIndex = imageCells[randomNum];
    for (const img of removedImgArr) {
      img.removeAttribute("src");
    }
    removedImgArr.push(removedImageIndex);
  }
  setTimeout(() => {
    addOpacity();
    countDown(); // Start timer only after opacity is applied
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  }, 2000);
}
startBtn.addEventListener("click", cellBackgrounds);

const correctCells = [];
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (imageCells[cellIndex].src !== "") {
    this.style.backgroundColor = "#0f0";
    correctCells.push(imageCells[cellIndex]);
    const combinedCellArr = [...correctCells];
    // if the last element at the correct index is clicked win!
    for (const correctCell of combinedCellArr) {
      if (combinedCellArr.length >= 9) {
        if (
          combinedCellArr.lastIndexOf(correctCell) ===
          combinedCellArr.length - 1
        ) {
          for (const cell0 of cells) {
            cell0.style.backgroundColor = "#0f0";
            cell0.removeEventListener("click", cellClicked);
            statusText.textContent = "Congrats You win!🎉🎊";
            clearInterval(timerFunc);
          }
        }
      }
    }
  } else {
    //did this because the timer still counts at  least one time
    //   timer = 1
    for (const cell of cells) cell.style.backgroundColor = "#f00";
    gameOver.textContent = "Ha! You lost ☹ better luck next time";
    cells.forEach((cell) => cell.removeEventListener("click", cellClicked));
     clearInterval(timerFunc);
     //disable the start button
     startBtn.setAttribute("disabled", "true");
     console.log(startBtn)
  }
}

restartBtn.addEventListener("click", function () {
  window.location.reload();
  startBtn.setAttribute("disabled", "false");
});
