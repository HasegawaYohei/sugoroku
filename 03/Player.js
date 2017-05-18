/**
 * すごろくゲームのプレイヤー
 * プレイヤーの名前, 現在位置, ゴールしたかを管理
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class Player{
  constructor (id, name) {
    this.id = id;
    this.name = name;
    this.place = 0;
    this.isGoal = false;
  }

  /**
   * 現在位置にnを足す.
   * @param {number} n
   * @return {number} 1
   */
  go (n) {
    this.place += n;
    writeLog(`${n}歩進みます.<br>`);
    return 1;
  }

  /**
   * 現在位置からnを引く.
   * @param {number} n
   * @return {number} 0
   */
  back (n) {
    this.place -= n;
    writeLog(`${n}歩戻ります.<br>`);
    return 0;
  }

  /**
   * nが偶数ならgo()を奇数ならback()を呼び出し, その返り値を返す.
   * @param {number} n
   * @return {number} 0 or 1
   */
  action (n) {
    return n % 2 ? this.back(n) : this.go(n);
  }
}