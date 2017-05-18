/**
 * すごろくゲーム本体.
 * Bord, Dice, Player ScoreBordを管理する.
 * ゲーム全体の流れを管理し, それぞれのクラスのメソッドの使用, プロパティの更新を行う.
 * @author HasegawaYohei
 */
class Sugoroku {
  constructor (numSquare, numPlayer) {
    this.init(numSquare, numPlayer);
  }

  /**
   * さいころの目の最大値
   */
  get DICE_SURFACE_COUNT () {
    return 8;
  }

  /**
   * ゴールを超えたときのペナルティ
   */
  get PENALTY () {
    return 5;
  }

  /**
   * すごろく初期化
   * @param {number} numSquare
   * @param {number} numPlayer
   */
  init (numSquare, numPlayer) {
    this.tern = 1;
    this.scoreBord = new ScoreBord(numPlayer);
    this.bord = new Bord(numSquare);
    this.dice = new Dice(this.DICE_SURFACE_COUNT);
    this.playerArray = new Array(numPlayer).fill(0).map( (element, index, array) => {
      return new Player(index,　`プレイヤー${index+1}`);
    });
    this.activePlayerArray = $.extend(true, [], this.playerArray);
    this.currentPlayerId = 0;
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

    Html.addText(`#logArea`, `${player.name}: ${playerDice}の目が出ました.`);

    player.action(playerDice);
    score = this.bord.getScore(player.place);
    this.scoreBord.addScore(player.id, this.tern, score);
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
    if (player.place === this.bord.numSquare) return this.goal;
    if (player.place > this.bord.numSquare) return this.overGoal;
    if (player.place < 0) return this.underStart;

    return this.writeInfo;
  }

  /**
   * ゴールを超えたときの処理
   * @param {Player} player
   * @param {Sugoroku} self
   */
  overGoal (player, self) {
    // ゴール地点を超えた分だけ戻る.
    player.place -= (player.place - self.bord.numSquare) * 2;
    let score = self.bord.getScore(player.place);
    // ゴールを超えて戻ったら5点減点.
    score -= self.PENALTY;
    self.scoreBord.addScore(player.id, self.tern, score);
  }

  /**
   * スタート地点よりも前に戻ってしまったら, スタート地点に戻る.
   * @param {Player} player
   * @param {Sugoroku} self
   */
  underStart (player, self) {
    player.place = 0;
    self.writeInfo(player, self);
  }

  /**
   * ゴールした時の処理
   * @param {Player} player
   * @param {Sugoroku} self
   */
  goal (player, self = this) {
    player.isGoal = true;
    self.addBonusScore();
    let text = `${player.name}: ゴール!! ${self.scoreBord.getScore(player.id)}点`;
    Html.writeText(`#playerInfo${player.id}`, text);
    self.endSugoroku();
  }

  /**
   * writeInfo を実行
   * @param {Player} player
   * @param {Sugoroku} self
   */
  writeInfo (player, self = this) {
    let text = `${player.name}: ${player.place}マス目 ${self.scoreBord.getScore(player.id, self.tern)}点`;
    Html.writeText(`#playerInfo${player.id}`, text);
  }

  /**
   * プレイヤーのスコアに (総プレイヤー数*3 / その時点での各プレイヤーの順位) を足す
   */
  addBonusScore () {
    let placeArray = this.playerArray.map( (element, index, array) => {
          return element.place;
        }).sort( (a, b) => {
          return a < b;
        });

    this.playerArray.forEach( (currentValue, index, array) => {
      let bounus = (this.playerArray.length * 3) / (placeArray.indexOf(currentValue.place) + 1);
      this.scoreBord.addScore(currentValue.id, this.tern, bounus);
    }, this);
  }

  /**
   * 各プレイヤーの行動終了時処理
   */
  endPlayAction () {
    // 行動するプレイヤーの更新
    if (!this.updateCurrentPlayer()) {
      // 更新できなければ, アクティブプレイヤーリストを更新して, 設定し直す.
      this.updateActivePlayerArray();
      this.updateTern();
    }
    Html.writeText(`#messageArea`, `${this.tern}ターン目: ${this.activePlayerArray[this.currentPlayerId].name}さんの番です`);
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
  updateTern () {
    this.tern += 1;
    Html.writeText(`#ternInfo`, `ターン: ${this.tern}`);
  }

  /**
   * すごろく終了処理
   */
  endSugoroku () {
    let winnerIdArray = this.scoreBord.getWinner(),
        winnerArray = this.playerArray.filter( (playersElement, playersIndex, playersArray) =>  {
          return winnerIdArray.some( (idArrayElement, idArrayIndex, idArrayArray) => {
            return idArrayElement === playersElement.id;
          })
        }),
        text = "";

    winnerArray.forEach( (currentValue, index, array) => {
      text += `${currentValue.name}さん・`;
    });
    text = text.slice(0, -1);
    text += `の勝ちです.`;
    Html.writeText(`#messageArea`, `ゲーム終了`);
    Html.writeText(`#result`, text);
    this.playerArray
      .filter( (element, index, array) => {
        return !element.isGoal;
      })
      .forEach( (currentValue, index, array) => {
        Html.writeText(`#playerInfo${currentValue.id}`, `${currentValue.name}: ${currentValue.place}マス目 ${this.scoreBord.getScore(currentValue.id, this.tern)}点`);
      });

    resetButtonInit();
  }
}