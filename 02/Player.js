/**
 * すごろくゲームのプレイヤー
 * プレイヤーの名前, 現在位置, ゴールしたかを管理
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class Player{
  constructor (name) {
    this.name = name;
    this.place = 0;
    this.isGoal = false;
  }

  /**
   * 与えられたnだけ現在位置を進める.
   * @param {number} n
   */
  go (n) {
    this.place += n;
  }
}