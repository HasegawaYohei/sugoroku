/**
 * さいころ
 * 1 ~ n (n: 任意の値) の中でランダムな整数を返す.
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class Dice {
  constructor (diceSurfaceCount) {
    this.diceSurfaceCount = diceSurfaceCount;
  }

  /**
   * 1 ~ this.diceSurfaceCountの中のランダムな整数を返す.
   * @return {number}
   */
  roll () {
    return Math.floor( Math.random() * this.diceSurfaceCount) + 1;
  }
}