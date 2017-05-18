/**
 * HTMLを管理するクラス.
 * @author HasegawaYohei
 */
class Html {
  /**
   *与えられたidを持つタグにtextを出力する.
   * @param {string} id 出力先のHTMLタグのid(#含む)
   * @param {string} text 出力する文字列
   */
  static writeText (id, text) {
    $(id).html(text);
  }

  static addText (id, text) {
    let $element = $(id),
        preText = $element.html();

    $element.html(preText + text);
  }
}