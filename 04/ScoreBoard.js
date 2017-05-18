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
   * @param {number} tern
   * @param {number} score
   */
  addScore (id, tern, score) {
    if (this.scoreArray[id][tern] === undefined) this.scoreArray[id][tern] = this.getScore(id, tern - 1) + score;
    else this.scoreArray[id][tern] += score;
  }

  /**
   * プレイヤーの得点を返す.
   * ternが与えられれば, 与えられたターンの得点を返す.
   * ternがundefinedなら, 最新のターンの得点を返す.
   * @param {number} id
   * @param {number} tern
   * @return {number}
   */
  getScore (id, tern) {
    let obj = this.scoreArray[id],
        i = Object.keys(obj).length;
    if (tern === undefined) return obj[i - 1];
    return this.scoreArray[id][tern] || 0;
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