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
  let numSpace = Number($("#numSpace").val()),
      numPlayer = Number($("#numPlayer").val());

  if (numSpace >= 20 && numSpace <= 30) {
    if (numPlayer >= 2 && numPlayer <= 4) {
      sugoroku = new Sugoroku(numSpace, numPlayer);
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
                      マス目: ${sugoroku.board.numSpace}
                    `);
  $turnInfo.html(`ターン: ${sugoroku.turn}<br>`);
  $playerInfo.empty();
  sugoroku.playerArray.forEach( (currentValue, index, array) => {
    let $elem = $("<p>");
    $elem.attr("id", `playerInfo${index}`);
    $elem.html(`${sugoroku.playerArray[index].name}: スタート`);
    $playerInfo.append($elem);
  }, this);
  $result.empty();

  Html.writeText(`#messageArea`, `${sugoroku.turn}ターン目: ${sugoroku.playerArray[0].name}さんの番です`);
}

/**
 * Resetボタン
 */
const resetButtonInit = () => {
  let numSpace = Number($("#numSpace").val()),
      numPlayer = Number($("#numPlayer").val()),
      $resetButton = $("<button>");

  $resetButton.attr("id", "resetButton");
  $resetButton.addClass("btn btn-danger center-block");
  $resetButton.html("リセット");
  $resetButton.on("click", () => {

    sugoroku.init(numSpace, numPlayer);
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