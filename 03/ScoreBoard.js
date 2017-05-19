/**
 * 得点板.
 * 全てのプレイヤーの得点を管理する.
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class ScoreBoard {
  constructor (n) {
    this.scoreArray = new Array(n).fill(0).map( (element, index, array) => {
      return {id: index};
    });
  }

  /**
   * プレイヤーのそのターンの得点を追加する.
   * @param {number} id
   * @param {number} turn
   * @param {number} score
   */
  addScore (id, turn, score) {
    if (this.scoreArray[id][turn] === undefined) this.scoreArray[id][turn] = this.getScore(id, turn - 1) + score;
    else this.scoreArray[id][turn] += score;
  }

  /**
   * プレイヤーの得点を返す.
   * turnが与えられれば, 与えられたターンの得点を返す.
   * turnがundefinedなら, 最新のターンの得点を返す.
   * @param {number} id
   * @param {number} turn
   * @return {number}
   */
  getScore (id, turn) {
    let obj = this.scoreArray[id],
        i = Object.keys(obj).length;
    if (turn === undefined) return obj[i - 1];
    return this.scoreArray[id][turn] || 0;
  }

  /**
   * 得点の最大値を返す.
   * @return {number}
   */
  getMaxScore () {
    let scores = this.scoreArray.map( (element, index, array) => {
      let i = Object.keys(element).length;
      return element[i - 1];
    });

    return Math.max.apply(null, scores);
  }

  /**
   * 最大値を持つidを返す.
   * @return {Array}
   */
  getWinner () {
    let max = this.getMaxScore();
    return this.scoreArray
            .filter( (element, index, array) => {
              // 各配列の末尾は最終的な得点が格納されている.
              let i = Object.keys(element).length;
              return element[i - 1] === max;
            }).map( (element, index, array) => {
              return element.id;
            });
  }}