/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-09 17:49:44
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-09 19:12:42
 * @FilePath: /start-1/src/example/svg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);
gsap.set("#path, #code", {visibility:"visible"});
//we set visibility:hidden in the CSS to avoid an initial flash - make them visible now, but the from() tweens are going to essentially hide them anyway because their stroke position/length will be 0.

var tl = gsap.timeline({ onUpdate: updateSlider });

//animate the plugin text first, drawing to 100%
// tl.fromTo('.plugin-stroke', { drawSVG: '20%'}, { duration: 2, drawSVG: '100%', ease: 'none' })
//now animate the logo strokes (note we use "102% as FireFox 34 miscalculates the length of a few strokes)
//fade in the real logo and the rest of the text
//hide the logo strokes that are now obscured by the real logo (just to improve rendering performance)

//--- SLIDER ---

gsap.to('#path', { drawSVG: false, duration: 3, ease: 'power1.inOut' });

function updateSlider() {}
