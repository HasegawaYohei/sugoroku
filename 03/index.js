/**
 * 初期化
 */
const init = () => {
  domInit();
  diceButtonInit();
}

/**
 * スタートボタン
 */
let sugoroku;
$("#startButton").on("click", () => {
  let space = Number($("#space").val()),
      numPlayer = Number($("#numPlayer").val());

  if (space >= 20 && space < 40) {
    if (numPlayer >= 2 && numPlayer < 6) {
      sugoroku = new Sugoroku(space, numPlayer);
      init();
    }
  }
});

/**
 * DOM初期化
 */
const domInit = () => {
  let $logPanel = $("#logPanel"),
      $logPanelBody = $("#logPanelBody"),
      $infoPanel = $("#infoPanel"),
      $sugorokuInfo = $("#sugorokuInfo"),
      $turnInfo = $("#turnInfo"),
      $playerInfo = $("#playerInfo"),
      $result = $("#result"),
      $diceButton = $("<button>"),
      $hr = $("<hr>"),
      $logArea = $("<p>");

  // Log Panel 作成
  $logPanel.show();
  $diceButton.attr("id", "diceButton");
  $diceButton.addClass("btn btn-success center-block");
  $diceButton.html("さいころ");
  $logArea.attr("id", "logArea");
  $logArea.html("Game Start!!<br>");
  $logPanelBody.empty();
  $logPanelBody.append($diceButton, $hr, $logArea);

  // Info Panel 作成
  $infoPanel.show();
  $sugorokuInfo.html(`ダイス: ${sugoroku.dice.diceSurfaceCount}面<br>
                      マス目: ${sugoroku.board.space}
                    `);
  $turnInfo.html(`ターン: ${sugoroku.turn}<br>`);
  $playerInfo.empty();
  for (let i = 0, l = sugoroku.playerArray.length; i < l; i++) {
    let $elem = $("<p>");
    $elem.attr("id", `playerInfo${i}`);
    $elem.html(`${sugoroku.playerArray[i].name}: スタート`);
    $playerInfo.append($elem);
  }
  $result.empty();

  writeMessage(`${sugoroku.turn}ターン目: ${sugoroku.playerArray[0].name}さんの番です`);
}

/**
 * Resetボタン
 */
const resetButtonInit = () => {
  let space = Number($("#space").val()),
      numPlayer = Number($("#numPlayer").val()),
      $resetButton = $("<button>");

  $resetButton.attr("id", "resetButton");
  $resetButton.addClass("btn btn-danger center-block");
  $resetButton.html("リセット");
  $resetButton.on("click", () => {

    sugoroku.init(space, numPlayer);
    init();
  })

  $("#diceButton").remove();
  $("#logPanelBody").prepend($resetButton);
}

/**
 * Diceボタン
 */
const diceButtonInit = () => {
  $("#diceButton").on("click", () => {
    sugoroku.playAction();
  });
};

/**
 * Log出力
 */
const writeLog = text => {
  let $logArea = $("#logArea"),
      preText = $logArea.html();
  $logArea.html(preText + text);
};

/**
 * PlayerInfo出力
 */
const writeInfo = (id, text) => {
  $(id).html(text);
}

/**
 * ターン表示
 */
const writeTernInfo = text => {
  $("#turnInfo").html(text);
}

/**
 * メッセージ表示
 */
const writeMessage = text => {
  $("#messageArea").html(text);
}

const writeResult = text => {
  $("#result").html(text);
}

/**
 *
 */
const createPlayerList = (array, id) => {
  let firstArray  = array.slice(id + 1, array.length),
      secondArray = array.slice(0, id + 1);

  return firstArray.concat(secondArray);
}