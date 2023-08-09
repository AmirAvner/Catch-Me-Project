let startOrPauseBtn = document.getElementById("start-the-game-btn");
startOrPauseBtn.addEventListener("click", letsGo);

let isGameRunning = false;
function letsGo() {
  isGameRunning = !isGameRunning;
  startOrPauseBtn.innerText = isGameRunning ? "Pause" : "Continue";

  if (isGameRunning) {
    letsGo2();
  } else {
    pauseTimer();
    divEl.classList.remove("spin-animation");
    divEl.removeEventListener("mouseenter", changePositionDelay);
    blackContainer.removeEventListener("click", missed);
    divEl.removeEventListener("click", clicksToNextLevelAndScore);

    // timerElement.innerText = "timer: 60";
  }

  //let startTheGame = confirm("מוכן לשחק?");
  //if (startTheGame) {
  //alert("בהצלחה!!");

  //} else {
  //startOrPauseBtn.innerText = 'Start Playing';
  //alert("למה?? חבל");
  //}
}

document.addEventListener("DOMContentLoaded", function () {
  // what is this??
  divEl.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

function letsGo2() {
  timerClock();

  let header = document.querySelector("header");
  let restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart";
  restartBtn.style.position = "absolute";
  restartBtn.style.left = "380px";
  restartBtn.style.top = "15px";
  restartBtn.style.padding = "15px";
  restartBtn.style.fontSize = "17px";
  restartBtn.style.cursor = "pointer";

  restartBtn.style.borderRadius = "5px";

  restartBtn.addEventListener("click", () => {
    confirm("האם אתה בטוח שברצונך להתחיל מחדש?");
    location.reload();
  });

  header.appendChild(restartBtn);

  divEl.classList.add("spin-animation");
  divEl.addEventListener("mouseenter", changePositionDelay);
  blackContainer.addEventListener("click", missed);
  divEl.addEventListener("click", clicksToNextLevelAndScore);
}

const divEl = document.getElementById("click-me-container"); // why const?
let blackContainer = document.getElementById("black-container");
let scoreElement = document.getElementById("score");
let clicksToNextElement = document.getElementById("clicks-to-next");
let levelElement = document.getElementById("level");
let missedClicksElement = document.getElementById("missed-clicks");
let timerElement = document.getElementById("timer");

let scoreCount = 0;
let clicksToNextLevelCount = 10;
let levelNum = 1;
let missedClicks = 0;
let timer = 60;
let playerName;

let clock;
function timerClock() {
  clock = setInterval(() => {
    if (timer > 0) {
      timer -= 1;
      timerElement.innerText = "timer: " + timer;
    } else {
      clearInterval(clock);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(clock);
}

setTimeout(() => {
  clearInterval(clock);
}, 60000);

function setXposition(xPos) {
  divEl.style.left = xPos + "px";
}

function setYposition(yPos) {
  divEl.style.top = yPos + "px";
}

function changePosition() {
  const spinContainerEl = document.querySelector("#black-container");
  const spincontainerHeight = spinContainerEl.clientHeight;
  const spincontainerWidth = spinContainerEl.clientWidth;
  const divHeight = divEl.clientHeight;
  const divwidth = divEl.clientWidth;
  const newXposition = Math.floor(
    Math.random() * (spincontainerWidth - divwidth + 1)
  );
  const newYposition = Math.floor(
    Math.random() * (spincontainerHeight - divHeight + 1)
  );
  setXposition(newXposition);
  setYposition(newYposition);
}

function changePositionDelay() {
  setTimeout(() => {
    changePosition();
  }, 10000);
}

function missed() {
  missedClicks += 1;
  missedClicksElement.textContent = "missed clicks: " + missedClicks;
  scoreCount -= 1;
  scoreElement.textContent = "score: " + scoreCount;
}

function clicksToNextLevelAndScore() {
  scoreCount += 10 * levelNum;
  scoreElement.textContent = "score: " + scoreCount;
  clicksToNextLevelCount -= 1;
  clicksToNextElement.textContent =
    "clicks to next level: " + clicksToNextLevelCount;
  if (clicksToNextLevelCount == 0) {
    clicksToNextElement.textContent = "clicks to next level: 10";
    clicksToNextLevelCount = 10;
    timer += 11;
    increaseLevel(scoreCount);
  }
}

function increaseLevel(scoreCount) {
  levelNum += 1;

  if (levelNum == 6) {
    alert("כל הכבוד! סיימת את המשחק!");

    playerName = prompt("your name?");

    let leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    leaderBoard.push({ name: playerName, score: scoreCount });
    leaderBoard.sort((a, b) => {
      if(a.score > b.score) {
        return -1;
      } else {
        return 1;
      }
    }  );
    if(leaderBoard.length > 5) {
      leaderBoard.pop();
    }

    localStorage.setItem(
      "leaderBoard",
      JSON.stringify(leaderBoard)
    );
    updateLeaderBoard();

 
    
    
    levelElement.textContent = "level: 5";
    clicksToNextElement.textContent = "clicks to next level: 0";

    return;
  }
  levelElement.textContent = "level: " + levelNum;
}

function updateLeaderBoard() {
let leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
let leaderBoardElement = document.getElementById("leader-board");
leaderBoardElement.innerHTML = "";
for (const player of leaderBoard) {
  const playerElement = document.createElement("div");
  playerElement.textContent = player.name + ": " + player.score;
  playerElement.style.fontSize = "20px";
  playerElement.style.color = "black";
  leaderBoardElement.append(playerElement);
}}
updateLeaderBoard();

localStorage.removeItem('scoreBoard');
