/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-05 18:47:07
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-06 16:48:20
 * @FilePath: /start-1/src/example/fu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';

import '../style.css';

const CONFIG = {
  CAMERA_POSITION: new THREE.Vector3(0, 0, 4),
  CONTROLS: true,
  TEXTS: '福禄寿喜高'.split(''),
  POSITIONS: [
    new THREE.Vector3(0, 0, 4),
    new THREE.Vector3(1, 0, 3.5),
    new THREE.Vector3(2.1, 0, 3),
    new THREE.Vector3(-1, 0, 3.5),
    new THREE.Vector3(-2.1, 0, 3),
  ],
  ROTATIONS: Array.from({ length: 5 }, (_, index) => THREE.MathUtils.degToRad(1080 + 72 * -index)),
  RANDOM: 3 || Math.floor(Math.random() * 5),
};

(function initStage(config) {
  // init all necessary stuffs on the stage
  const scene = new THREE.Scene();

  //   scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(...config.CAMERA_POSITION);

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.outputColorSpace = THREE.SRGBColorSpace;
  //   renderer.toneMapping = THREE.ACESFilmicToneMapping;
  //   renderer.toneMappingExposure = 0.5; // 觉得暗可以改成 1.2

  //   renderer.shadowMap.enabled = true;
  //   renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 推荐的阴影类型
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  document.body.appendChild(renderer.domElement);

  if (config.CONTROLS) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    window.controls = controls;
  }

  window.scene = scene;
  window.camera = camera;
  window.renderer = renderer;
  window.clock = new THREE.Clock();
})(CONFIG);

function createCubes() {
  // 2. 创建普通材质 (其他 5 个面用)
  // 比如用跟福字背景一样的中国红，但不带字
  const plainMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6000f, // 中国红
    roughness: 0.4,
  });

  // 3. 组合成材质数组
  // 顺序：右, 左, 上, 下, 前, 后

  const delta = THREE.MathUtils.degToRad(72);
  const cubes = [];
  const rotations = [0, -1.8, -0.6, 0.6, 1.8];
  for (let i = 0; i < 5; i++) {
    const fuTexture = createFuTexture(CONFIG.TEXTS[i]);

    // 1. 创建“福”字材质 (正面用)
    const fuMaterial = new THREE.MeshStandardMaterial({
      map: fuTexture, // 贴上福字
      color: 0xffffff, // 保持白色基底，以免贴图变色
      roughness: 0.4,
    });
    const materials = [
      plainMaterial, // Right
      plainMaterial, // Left
      plainMaterial, // Top
      plainMaterial, // Bottom
      fuMaterial, // Front (索引 4：正对相机的 Z+ 面)
      fuMaterial, // Back
    ];
    const geometry = new THREE.BoxGeometry(0.8, 1, 0.1);
    const box = new THREE.Mesh(geometry, materials);
    box.name = CONFIG.TEXTS[i];
    const vec = new THREE.Vector3(Math.sin(i * delta) * 4, 0, Math.cos(i * delta) * 4);
    box.position.set(...vec);
    // box.position.set(...CONFIG.POSITIONS[i]);
    box.rotation.y = rotations[i];
    cubes.push(box);
  }
  return cubes;
}

(function addToScene() {
  //   const box = new THREE.Mesh(geometry, materials);
  //   box.position.set(0, 0, 3);

  const group = new THREE.Group();
  window.group = group;
  const vec = new THREE.Vector3(0, 0.8, -4);
  group.position.set(...vec);
  group.rotation.x = 0.2;
  group.add(...createCubes());
  scene.add(group);
})();

let count = 0;
// let maxCount = 1200;  // 2280
// let maxCount = 1300;  // 2458
let maxCount = 1400; // 2635

(function animate() {
  const elapsedTime = clock.getElapsedTime();

  //   if (CONFIG.ROTATIONS[CONFIG.RANDOM]*1000 > group.rotation._y) {
  //     if (count < maxCount) {
  //       group.rotation.y += 0.001 + Math.min(330, count) * 0.0001;
  //     } else {
  //       if (Math.min(600 + maxCount - count, count) < 80) {
  //         // alert(THREE.MathUtils.radToDeg(group.rotation._y))
  //       }
  //       group.rotation.y += 0.001 + Math.max(80, Math.min(300 + maxCount - count, count)) * 0.0001;
  //     }
  //     count++;
  //   } else {

  //   }

  //   scene.traverse((object) => {
  //     if (object.isMesh && object.name == '禄' && count == 60) {
  //       console.log(object, 'this is mesh');
  //       animatePositionRotation(object, CONFIG.TEXTS.indexOf(object.name));
  //     }

  //     if (object.isMesh && object.name == '寿' && count == 120) {
  //       console.log(object, 'this is mesh');
  //       animatePositionRotation(object, CONFIG.TEXTS.indexOf(object.name));
  //     }

  //     if (object.isMesh && object.name == '喜' && count == 180) {
  //       console.log(object, 'this is mesh');
  //       animatePositionRotation(object, CONFIG.TEXTS.indexOf(object.name));
  //     }

  //     if (object.isMesh && object.name == '高' && count == 240) {
  //       console.log(object, 'this is mesh');
  //       animatePositionRotation(object, CONFIG.TEXTS.indexOf(object.name));
  //     }
  //   });

  requestAnimationFrame(animate);
  if (CONFIG.CONTROLS) controls.update();
  renderer.render(scene, camera);
})();

(function startRotate() {
  const tl = gsap.timeline();
  const random = CONFIG.RANDOM;
  const others = Array.from({ length: 4 }, (_, index) => (random + index + 1) % 5);
  const objects = [];

  console.log(others, 'others');

  scene.traverse((object) => {
    object.isMesh && objects.push(object);
    if (object.isMesh && CONFIG.TEXTS[CONFIG.RANDOM] == object.name) {
      console.log(object.name);
      tl.to(group.rotation, {
        y: CONFIG.ROTATIONS[random],
        duration: 5,
        ease: 'sine.inOut',
      });
      //   .to(object.rotation, {
      //     y: 0,
      //     duration: 2,
      //     ease: 'expo.out',
      //   });
    }
  });

  console.log(objects);
  //   animatePositionRotation(objects[others[0]], random, -1);
  //   animatePositionRotation(objects[others[1]], random, -2);
  //   animatePositionRotation(objects[others[0]], random, -0.6, 1);
  //   animatePositionRotation(objects[others[1]], random, -1.3, 2);
  //   animatePositionRotation(objects[others[2]], random, 2, .8);
  //     animatePositionRotation(objects[others[3]], random, 4, 1);
})();

function updateCameraAspect() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateCameraAspect();
});

function createFuTexture(text = '福') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. 画红色背景
  ctx.fillStyle = '#D6000F'; // 中国红
  ctx.fillRect(0, 0, 512, 512);

  // 2. 画金色的边框 (可选)
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, 492, 492);

  // 3. 画“福”字
  ctx.fillStyle = '#FFD700'; // 金色
  ctx.font = 'bold 300px "KaiTi", "楷体", "STKaiti", serif'; // 使用楷体
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 为了防止字是倒的或反的，这里不需要特殊处理，因为UV默认是正的
  ctx.fillText(text, 256, 256);

  // 4. 生成纹理
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function animatePositionRotation(mesh, index, d, d1) {
  const tl = gsap.timeline({ delay: 7 });
  //   const vec = CONFIG.POSITIONS[index];
  const delta = THREE.MathUtils.degToRad(72);

  const vec = new THREE.Vector3(Math.sin(index * delta) * 4, 0, Math.cos(index * delta) * 4);

  tl.to(mesh.position, {
    // x: vec.x + d * Math.cos(THREE.MathUtils.degToRad(72)),
    x: vec.x + d,
    y: vec.y,
    z: vec.z + d1,
    duration: 2,
    ease: 'expo.out',
  }).to(
    mesh.rotation,
    {
      y: 0.6,
      duration: 2,
      ease: 'expo.out',
    },
    '<',
  );
}
