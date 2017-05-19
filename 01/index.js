const NUM_SQUARE = 30;
const NUM_DICE_MIN = 1;
const NUM_DICE_MAX = 6;
let playerPlace = 0,
    turn = 1;
    startButton = document.getElementById("startButton");


/**
 * すごろく初期化
 */
const init = () => {
  let logPanel = document.getElementById("logPanel"),
      infoPanel = document.getElementById("infoPanel"),
      sugorokuInfo = document.getElementById("sugorokuInfo"),
      playerInfo = document.getElementById("playerInfo"),
      diceButton = document.createElement("button"),
      hr = document.createElement("hr"),
      logArea = document.createElement("p");

  playerPlace = 0;
  turn = 1;
  logPanel.textContent = null;

  diceButton.id = "diceButton";
  diceButton.className = "btn btn-danger center-block";
  diceButton.innerHTML = "さいころ";

  logArea.id = "logArea";
  logArea.innerHTML = "Game Start!!<br>";

  logPanel.appendChild(diceButton);
  logPanel.appendChild(hr);
  logPanel.appendChild(logArea);

  infoPanel.style = `display: block`;
  sugorokuInfo.innerHTML = `ダイス: ${NUM_DICE_MAX}面<br>
                            マス目: ${NUM_SQUARE}<br>
                            ターン: ${turn}<br>
                            `;
  playerInfo.innerHTML = `プレイヤー1: スタート`;
};

/**
 * resetボタン
 */
const resetButtonInit = () => {
  let logPanel = document.getElementById("logPanel"),
      diceButton = document.getElementById("diceButton"),
      resetButton = document.createElement("button");

  resetButton.id = "resetButton";
  resetButton.className = "btn btn-success center-block";
  resetButton.innerHTML = "リセット";
  resetButton.addEventListener("click", () => {
    init();
    diceButtonInit();
  })

  logPanel.insertBefore(resetButton, logPanel.firstChild);
  diceButton.parentNode.removeChild(diceButton);
}

/**
 * Diceボタン
 */
const diceButtonInit = () => {
  let diceButton = document.getElementById("diceButton");
  diceButton.addEventListener("click", () => {
    let logArea = document.getElementById("logArea"),
        sugorokuInfo = document.getElementById("sugorokuInfo"),
        playerInfo = document.getElementById("playerInfo"),
        yourDice = Math.floor( Math.random() * (NUM_DICE_MAX - NUM_DICE_MIN + 1) ) + NUM_DICE_MIN;

    playerPlace += yourDice;
    turn += 1;
    logArea.innerHTML += `プレイヤー1: ${yourDice}の目が出ました.<br>`;
    playerInfo.innerHTML = `プレイヤー1: ${playerPlace}マス目`;
    sugorokuInfo.innerHTML = `ダイス: ${NUM_DICE_MAX}<br>
                              マス目: ${NUM_SQUARE}<br>
                              ターン: ${turn}<br>
                            　`;

    if (playerPlace >= NUM_SQUARE) {
      logArea.innerHTML += `プレイヤー1: ゴール!!<br>`;
      playerInfo.innerHTML = `プレイヤー1: ゴール`;
      resetButtonInit();
    }
  });
};

/**
 * Startボタン
 */
startButton.addEventListener("click", () => {
  init();
  diceButtonInit();
});