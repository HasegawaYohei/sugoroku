/**
 * スタートボタン
 */
document.getElementById("startButton").addEventListener("click", () => {
  let n = Number(document.getElementById("space").value);
  if (n >= 20 && n < 40) {
    sugoroku = new Sugoroku();
    domInit();
    diceButtonInit();
  }
});

/**
 * DOM初期化
 */
const domInit = () => {
  let logPanel = document.getElementById("logPanel"),
      logPanelBody = document.getElementById("logPanelBody"),
      infoPanel = document.getElementById("infoPanel"),
      sugorokuInfo = document.getElementById("sugorokuInfo"),
      turnInfo = document.getElementById("turnInfo"),
      playerInfo = document.getElementById("playerInfo"),
      diceButton = document.createElement("button"),
      hr = document.createElement("hr"),
      logArea = document.createElement("p");

  logPanel.style = "display: block";
  logPanelBody.textContent = null;

  diceButton.id = "diceButton";
  diceButton.className = "btn btn-danger center-block";
  diceButton.innerHTML = "さいころ";

  logArea.id = "logArea";
  logArea.innerHTML = "Game Start!!<br>";

  logPanelBody.appendChild(diceButton);
  logPanelBody.appendChild(hr);
  logPanelBody.appendChild(logArea);

  infoPanel.style = "display: block";
  sugorokuInfo.innerHTML = `ダイス: ${sugoroku.dice.diceSurfaceCount}面<br>
                            マス目: ${sugoroku.board.space}
                            `;
  turnInfo.innerHTML = `ターン: ${sugoroku.turn}<br>`;

  playerInfo.textContent = null;
  for (let i = 0, l = sugoroku.playerArray.length; i < l; i++) {
    let elem = document.createElement("p");
    elem.id = `playerInfo${i}`;
    elem.innerHTML = `${sugoroku.playerArray[i].name}: スタート`;
    playerInfo.appendChild(elem);
  }

  writeMessage(`${sugoroku.turn}ターン目: ${sugoroku.playerArray[0].name}さんの番です`);
}

/**
 * resetボタン
 */
const resetButtonInit = () => {
  let logPanelBody = document.getElementById("logPanelBody"),
      diceButton = document.getElementById("diceButton"),
      resetButton = document.createElement("button");

  resetButton.id = "resetButton";
  resetButton.className = "btn btn-success center-block";
  resetButton.innerHTML = "リセット";
  resetButton.addEventListener("click", () => {
    sugoroku = new Sugoroku();
    domInit();
    diceButtonInit();
  })

  logPanelBody.insertBefore(resetButton, logPanelBody.firstChild);
  diceButton.parentNode.removeChild(diceButton);
}

/**
 * Diceボタン
 */
const diceButtonInit = () => {
  let diceButton = document.getElementById("diceButton");
  diceButton.addEventListener("click", () => {
    sugoroku.playAction();
  });
};

/**
 * Log出力
 */
const writeLog = text => {
  let logArea = document.getElementById("logArea");
  logArea.innerHTML += text;
};

/**
 * PlayerInfo出力
 */
const writeInfo = (id, text) => {
  let playerInfo = document.getElementById(id);
  playerInfo.innerHTML = text;
}

/**
 * ターン表示
 */
const writeTurnInfo = text => {
  let turnInfo = document.getElementById("turnInfo");
  turnInfo.innerHTML = text;
}

/**
 * メッセージ表示
 */
const writeMessage = text => {
  let messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = text;
}