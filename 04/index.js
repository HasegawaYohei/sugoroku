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
  let numSquare = Number($("#numSquare").val()),
      numPlayer = Number($("#numPlayer").val());

  if (numSquare >= 20 && numSquare <= 30) {
    if (numPlayer >= 2 && numPlayer <= 4) {
      sugoroku = new Sugoroku(numSquare, numPlayer);
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
      $ternInfo = $("#ternInfo"),
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
  $sugorokuInfo.html(`ダイス: ${sugoroku.dice.numEyes}面<br>
                      マス目: ${sugoroku.board.numSquare}
                    `);
  $ternInfo.html(`ターン: ${sugoroku.tern}<br>`);
  $playerInfo.empty();
  sugoroku.playerArray.forEach( (currentValue, index, array) => {
    let $elem = $("<p>");
    $elem.attr("id", `playerInfo${index}`);
    $elem.html(`${sugoroku.playerArray[index].name}: スタート`);
    $playerInfo.append($elem);
  }, this);
  $result.empty();

  Html.writeText(`#messageArea`, `${sugoroku.tern}ターン目: ${sugoroku.playerArray[0].name}さんの番です`);
}

/**
 * Resetボタン
 */
const resetButtonInit = () => {
  let numSquare = Number($("#numSquare").val()),
      numPlayer = Number($("#numPlayer").val()),
      $resetButton = $("<button>");

  $resetButton.attr("id", "resetButton");
  $resetButton.addClass("btn btn-danger center-block");
  $resetButton.html("リセット");
  $resetButton.on("click", () => {

    sugoroku.init(numSquare, numPlayer);
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