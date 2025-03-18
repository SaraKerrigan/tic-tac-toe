const cells = document.querySelectorAll(".cell");
const clearBtn = document.querySelector(".clear__btn");
const [xScore, drawScore, oScore] = document.querySelectorAll(".text");
const clearModal = document.querySelector(".clear__modal");
const clearTitle = document.querySelector(".clear__title");

let countX = 0;
let countDraw = 0;
let countO = 0;

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "x";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

clearBtn.addEventListener("click", resetGame);

cells.forEach((cellEl, cellIndex) => {
  cellEl.addEventListener("click", () => handleClick(cellEl, cellIndex));
});

function counter(isDraw) {
  if (isDraw) {
    countDraw++;
    drawScore.textContent = countDraw;
  } else if (currentPlayer == "x") {
    countX++;
    xScore.textContent = countX;
  } else if (currentPlayer == "o") {
    countO++;
    oScore.textContent = countO;
  }
}

function resetGame() {
  currentPlayer = "x";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  cells.forEach((el) => {
    el.textContent = "";
    el.classList.remove("x", "o");
  });
  clearModal.classList.remove("clear__modal-active");
}

function handleTurn(cellIndex) {
  if (gameBoard[cellIndex] || !gameActive) {
    return;
  }
  gameBoard[cellIndex] = currentPlayer;
  checkForResult();
  currentPlayer = currentPlayer == "x" ? "o" : "x";
}

function renderBoard() {
  cells.forEach((cellEl, cellIndex) => {
    cellEl.textContent = gameBoard[cellIndex];
    if (gameBoard[cellIndex]) {
      cellEl.classList.add(gameBoard[cellIndex]);
    }
  });
}

function handleClick(cellEl, cellIndex) {
  handleTurn(cellIndex);
  renderBoard();
}

function openModal(text) {
  clearTitle.textContent = text;
  clearModal.classList.add("clear__modal-active");
}

function alertWinner(currentPlayer) {
  setTimeout(() => {
    openModal(`player ${currentPlayer} is winner`);
  }, 1000);
}

function alertDraw() {
  setTimeout(() => {
    openModal(`game draw`);
  }, 1000);
}

function checkForResult() {
  let isWin = false;
  for (let i = 0; i < combinations.length; i++) {
    const [index1, index2, index3] = combinations[i];
    if (
      gameBoard[index1] == currentPlayer &&
      gameBoard[index2] == currentPlayer &&
      gameBoard[index3] == currentPlayer
    ) {
      isWin = true;
      break;
    }
  }
  if (isWin) {
    alertWinner(currentPlayer);
    counter();
    gameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    alertDraw();
    counter(true);
    gameActive = false;
    return;
  }
}
