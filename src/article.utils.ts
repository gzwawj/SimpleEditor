/**
 * @function htmlscape 转义html脚本 < > & " '
 */
let htmlscape = function (html: string) {
    html = "" + html;
    return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
}
/**
 * @function scapehtml 还原html脚本 < > & " '
 */
let scapehtml = function (scape: string) {
    scape = "" + scape;
    return scape.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

export { htmlscape, scapehtml }