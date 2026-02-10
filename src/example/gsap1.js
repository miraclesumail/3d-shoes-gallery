/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-06 17:28:21
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-09 17:22:40
 * @FilePath: /start-1/src/example/gsap1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin} from 'gsap/MotionPathPlugin'
gsap.registerPlugin(MotionPathPlugin);

gsap.registerPlugin(SplitText);

let split = SplitText.create('.text', { type: 'chars, words' });

gsap.from(split.chars, {
  duration: 1,
  y: 100,
  autoAlpha: 0,
  stagger: 0.15,
});

// setTimeout(() => {
//   const target = document.querySelector('.text');
  
//   if (target && target.innerText.trim().length > 0) {
//     let split = new SplitText(target, { type: 'chars, words' });
    
//     gsap.from(split.chars, {
//       duration: 1,
//       y: 100,
//       autoAlpha: 0,
//       stagger: 0.05,
//     });
//   } else {
//     console.error("找不到 .text 元素，或者元素内容为空");
//   }
// }, 100); // 简单的延