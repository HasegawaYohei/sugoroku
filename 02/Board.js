/**
 * すごろくのボード.
 * マス目の設定・取得が可能.
 * Sugorokuクラスによってインスタンス化され, 管理される. よってグローバルにインスタンス化してはならない.
 * @author HasegawaYohei
 */
class Board{
  constructor (space) {
    this.space = space;
  }
};