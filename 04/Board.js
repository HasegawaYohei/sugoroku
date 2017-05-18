/**
 * すごろくのボード.
 * マス目の設定・取得, マス目ごとの得点を取得が可能.
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class Board{
  constructor (numSpace) {
    this.numSpace = numSpace;
    this.init();
  }

  /**
   * 割り当てられる得点の最高値.
   */
  get SCORE_MAX () {
    return 10;
  }

  /**
   * 割り当てられる得点の最低値.
   */
  get SCORE_MIN () {
    return 1;
  }

  /**
   * マス目にランダムに得点を割り当てる.
   */
  init () {
    this.scores = new Array(this.numSpace + 1).fill(0).map( (element, index, array) => {
      if (index === 0) return 0;
      if (index === this.numSpace) return 0;
      return Math.floor( Math.random() * (this.SCORE_MAX - this.SCORE_MIN + 1) ) + this.SCORE_MIN;
    });
  }

  /**
   * pマス目の得点を返す.
   * @param {number} p
   */
  getScore (p) {
    return this.scores[p] || 0;
  }
};