/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-01-26 12:31:26
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-01-26 12:36:36
 * @FilePath: /start-1/src/example/eg1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function convertChar(char) {
  return char.charCodeAt(0).toString(2).padStart(8, '0');
}

function convert(string) {
  let chars = string.split('');
  let binary = chars.map((char) => convertChar(char));
  return binary;
}

function draw(string) {
  let binary = convert(string);
  let canvas = document.querySelector('#app');
  let ps = 10;
  let cols = 2;
  let rows = 4;
  // let cols = 4;
  // let rows = 2;

  canvas.width = binary.length * cols * ps;
  canvas.height = rows * ps;

  let ctx = canvas.getContext('2d');
  for (let b = 0; b < binary.length; b++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let byte = binary[b];
        let bit = byte[r * cols + c];
        if (parseInt(bit) === 1) {
          let x = b * cols * ps + c * ps;
          let y = r * ps;
          ctx.fillRect(x, y, ps, ps);
        }
      }
    }
  }

  return canvas;
}

draw('h');
