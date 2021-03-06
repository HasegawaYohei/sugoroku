/**
 * すごろくゲーム本体.
 * Board, Dice, Player ScoreBoardを管理する.
 * ゲーム全体の流れを管理し, それぞれのクラスのメソッドの使用, プロパティの更新を行う.
 * @author HasegawaYohei
 */
class Sugoroku {
  constructor (space, numPlayer) {
    this.init(space, numPlayer);
  }

  /**
   * さいころの目の最大値
   */
  get DICE_SURFACE_COUNT () {
    return 8;
  }

  /**
   * すごろく初期化
   * @param {number} space
   * @param {number} numPlayer
   */
  init (space, numPlayer) {
    this.turn = 1;
    this.scoreBoard = new ScoreBoard(numPlayer);
    this.board = new Board(space);
    this.dice = new Dice(this.DICE_SURFACE_COUNT);
    this.playerArray = new Array(numPlayer).fill(0).map( (element, index, array) => {
      return new Player(index,　`プレイヤー${index+1}`);
    });
    this.activePlayerArray = $.extend(true, [], this.playerArray);
    this.currentPlayerId = 0;

    this.setPlayerPlaceZero = this.setPlayerPlaceZero.bind(this);
    this.goal = this.goal.bind(this);
    this.execWriteInfo = this.execWriteInfo.bind(this);
  };

  /**
   * プレイヤー1人の手番.
   * "さいころ"ボタンクリック時に発火
   */
  playAction () {
    let player = this.activePlayerArray[this.currentPlayerId],
        playerDice = this.dice.roll(),
        text = "",
        score = 0;

    writeLog(`${player.name}: ${playerDice}の目が出ました.`);

    // Player.action() は進んだときに1, 戻ったときに0を返すので, 返り値をチェックしてスコアを設定する.
    if (player.action(playerDice)) score = this.board.getScore([player.place]);
    this.scoreBoard.addScore(player.id, this.turn, score);
    // プレイヤーの現在位置を確認し, 返された処理を実行する.
    this.checkPlace(player)(player, this);
    this.endPlayAction();
  }

  /**
   * プレイヤーの現在位置をチェックし, 必要な処理を返す
   * @param {Player} player
   * @return {Function}
   */
  checkPlace (player) {
    if (player.place === this.board.space) return this.goal;
    if (player.place > this.board.space || player.place < 0) return this.setPlayerPlaceZero;

    return this.execWriteInfo;
  }

  /**
   * プレイヤーの現在位置をスタート地点にする
   * @param {Player} player
   */
  setPlayerPlaceZero (player) {
    player.place = 0;
    this.execWriteInfo(player);
  }

  /**
   * ゴールした時の処理
   * @param {Player} player
   */
  goal (player) {
    player.isGoal = true;
    let goalCount = this.playerArray.filter( (element, index, array) => {
          return element.isGoal;
        }).length,
        goalScore = Math.round(this.playerArray.length / goalCount);

    this.scoreBoard.addScore(player.id, this.turn, goalScore);
    let text = `${player.name}: ゴール!! ${this.scoreBoard.getScore(player.id)}点`;
    writeInfo(`#playerInfo${player.id}`, text);
  }

  /**
   * writeInfo を実行
   * @param {Player} player
   */
  execWriteInfo (player) {
    let text = `${player.name}: ${player.place}マス目 ${this.scoreBoard.getScore(player.id, this.turn)}点`;
    writeInfo(`#playerInfo${player.id}`, text);
  }

  /**
   * 各プレイヤーの行動終了時処理
   */
  endPlayAction () {
    // 行動するプレイヤーの更新
    if (!this.updateCurrentPlayer()) {
      // 更新できなければ, アクティブプレイヤーリストを更新して, 設定し直す.
      if (!this.updateActivePlayerArray()) {
        // アクティブプレイヤーリストがない === 全員ゴールした.
        this.endSugoroku();
        return;
      }

      this.updateTurn();
    }
    writeMessage(`${this.turn}ターン目: ${this.activePlayerArray[this.currentPlayerId].name}さんの番です`);
  }

  /**
   * 次に行動するプレイヤーを更新
   * @return {boolean}
   */
  updateCurrentPlayer () {
    if (this.currentPlayerId === (this.activePlayerArray.length - 1)) return false;

    this.currentPlayerId += 1;
    return true;
  }

  /**
   * アクティブプレイヤーリストの更新
   * @return {boolean}
   */
  updateActivePlayerArray () {
    let newActivePlayerArray = this.activePlayerArray.filter( (element, index, array) => {
      return !element.isGoal;
    });

    if (newActivePlayerArray.length === 0) return false;

    this.activePlayerArray = newActivePlayerArray;
    this.currentPlayerId = 0;
    return true;
  }

  /**
   * ターンを更新する
   */
  updateTurn () {
    this.turn += 1;
    writeTurnInfo(`ターン: ${this.turn}`);
  }

  /**
   * すごろく終了処理
   */
  endSugoroku () {
    let winnerIdArray = this.scoreBoard.getWinner(),
        winnerArray = this.playerArray.filter( (playerArrayElement, playerArrayIndex, playerArrayArray) =>  {
          return winnerIdArray.some( (idArrayElement, idArrayIndex, idArrayArray) => {
            return idArrayElement === playerArrayElement.id;
          })
        }),
        text = "";

    winnerArray.forEach( (element, index, array) => {
      text += `${element.name}さん・`;
    });
    text = text.slice(0, -1);
    text += `の勝ちです.`;
    writeMessage(`ゲーム終了`);
    writeResult(text);
    resetButtonInit();
  }
}