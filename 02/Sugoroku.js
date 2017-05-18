/**
 * すごろくゲーム本体.
 * Board, Dice, Player ScoreBoardを管理する.
 * ゲーム全体の流れを管理し, それぞれのクラスのメソッドの使用, プロパティの更新を行う.
 * @author HasegawaYohei
 */
class Sugoroku {
  constructor () {
    this.init();
  }

  /**
   * プレイヤー数
   */
  get NUM_PLAYER () {
    return 2;
  }

  /**
   * さいころの目
   */
  get DICE_SURFACE_COUNT () {
    return 12;
  }

  /**
   * すごろく初期化
   */
  init () {
    this.currentPlayerId = 0;
    this.tern = 1;
    this.board = new Board(Number(document.getElementById("space").value));
    this.dice = new Dice(this.DICE_SURFACE_COUNT);
    this.playerArray = [];
    for (let i = 1; i <= this.NUM_PLAYER; i++) {
      let player = new Player(`プレイヤー${i}`);
      this.playerArray.push(player);
    }
  }

  /**
   * プレイヤー1人の手番.
   * "さいころ"ボタンクリック時に発火
   */
  playAction () {
    let currentPlayer = this.playerArray[this.currentPlayerId];
    let playerDice = this.dice.roll();

    currentPlayer.go(playerDice);
    writeLog(`${currentPlayer.name}: ${playerDice}の目が出ました<br>`);

    this.checkPlace(currentPlayer);
    if (currentPlayer.isGoal) return;

    if (this.currentPlayerId === this.NUM_PLAYER - 1) {
      this.currentPlayerId = 0;
      this.tern += 1;
      writeTernInfo(`ターン: ${this.tern}`);
    }
    else {
      this.currentPlayerId += 1;
    }

    writeMessage(`${this.tern}ターン目: ${this.playerArray[this.currentPlayerId].name}さんの番です`);
  }

  /**
   * プレイヤーの現在位置を確認し, 必要な処理を行う.
   * @param {Player} player
   */
  checkPlace (player) {
    let text;
    if (player.place === this.board.space) {
      player.isGoal = true;
      text = `${player.name}: ゴール!!`;
      writeMessage(`${this.tern}ターン目: ${player.name}さんがゴールしました`);
      resetButtonInit();
    }
    else if (player.place > this.board.space) {
      let over = player.place - this.board.space;
      player.place = this.board.space - over;
      text = `${player.name}: ${player.place}マス目`;
    }
    else {
      text = `${player.name}: ${player.place}マス目`;
    }
    writeInfo(`playerInfo${this.currentPlayerId}`, text);
  }
}