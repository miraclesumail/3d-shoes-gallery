/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-07 15:34:18
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-07 17:33:12
 * @FilePath: /start-1/src/example/scroll.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../style.css';

gsap.registerPlugin(ScrollTrigger);

const box = document.querySelector('.box');
// 当窗口滚动100px触发
// gsap.to('.box', {
//   x: 100,
//   scrollTrigger: {
//     trigger: 'box',
//     start: 100,
//   },
// });

// 当box的上边缘滚动到距离窗口上面100px触发
// gsap.to('.box', {
//   x: 100,
//   scrollTrigger: {
//     trigger: '.box',
//     start: 'top 100px',
//     // start: 'bottom center',  底部距离视口上面50vh触发
//     markers: true,
//   },
// });

// 划到end位置结束动画用toggleActions 到达end暂停
/**
 * toggleActions: 'play pause resume reset'
 * 1. 当start触发时play 对应onenter
 * 2. 当end触发时pause  onleave
 * 3. 当再次回到end时resume动画  onEnterBack
 * 4. 当再次回到start时reset到初始位置  onLeaveBack
 */
gsap.to('.box', {
  x: 600,
  duration: 10,
  scrollTrigger: {
    trigger: '.box',
    start: 'top center',
    end: 'bottom center',
    toggleActions: 'play pause resume reset',
    onLeaveBack: (self) => {
      console.log('onLeaveBack');
    },
    onEnterBack: (self) => {
      console.log('onEnterBack');
    },
    // once: true,
    // onEnter: () => void,  当到了start的时候
    //  onLeave: () => void  当到了end的时候
    markers: true,
  },
});

/**
 * start： number | string 默认是box的top距离viewport顶部距离(number) 可以自定义'top center'当box的中部距离viewpoint=0.5vh时
 * end： number | string 默认是box的bottom距离viewport顶部距离(number) 可以自定义'bottom center'当box的中部距离viewpoint=0.5vh时
 */
gsap.to('.box', {
  x: 600,
  duration: 10,
  scrollTrigger: {
    trigger: '.box',
    start: 'top center',
    end: () => `+=${box.offsetHeight}`,
    toggleActions: 'play pause',
    markers: true,
  },
});
