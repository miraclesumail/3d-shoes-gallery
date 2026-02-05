/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-04 13:49:05
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-05 16:46:59
 * @FilePath: /start-1/src/example/shoe.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import '../style.css';

const CONFIG = {
  CAMERA_POSITION: new THREE.Vector3(0, 0, 4),
  CONTROLS: true,
};

const state = {
  current: null,
  items: {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  },
};

const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;

(function initLoader() {
  // init gltf loader
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  // set dracoLoader path
  dracoLoader.setDecoderPath('/draco/');
  dracoLoader.preload();

  // set dracoLoader to gtlf loader
  loader.setDRACOLoader(dracoLoader);
  window.loader = loader;
})();

(function initGui() {
  const params = {
    myColor: '#ff0000', // 初始颜色
  };
  const gui = new GUI();
  gui.addColor(params, 'myColor').onChange((value) => {
    console.log(value, '---000--');
    window.nodeName && changeMaterialColor(window.nodeName, value.replace('#', '0x'));
    state.current && (state.items[state.current] = value);
  });
})();

(function initStage(config) {
  document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`;
  // init all necessary stuffs on the stage
  const scene = new THREE.Scene();

  //   scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(...config.CAMERA_POSITION);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5; // 觉得暗可以改成 1.2

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 推荐的阴影类型
  //   const pmremGenerator = new THREE.PMREMGenerator(renderer);
  //   scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
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

(function setEnvironment() {
  // 1. 实例化加载器
  const exrLoader = new EXRLoader();
  const rgbeLoader = new RGBELoader();

  // 2. 使用 Drei 官方使用的同一个 CDN 地址
  // 这是 city preset 对应的真实文件地址
  const envUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/potsdamer_platz_1k.exr';
  const envUrl1 = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr';

  exrLoader.load(envUrl, (texture) => {
    // 3. 关键设置：映射方式
    // 这告诉 Three.js 这是一张 360度全景图，而不是普通平面图
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // 4. 赋值给场景环境
    // 这会让所有 PBR 材质（StandardMaterial）开始反射这张图的光照
    scene.environment = texture;

    // [可选] 如果你想在背景里也看到这张图，把下面这行取消注释
    // scene.background = texture;

    // [可选] 调整环境光强度（类似 R3F 的 environmentIntensity）
    scene.environmentIntensity = 0.8;
  });

//   rgbeLoader.load(envUrl1, (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = texture;
//   });
})();

(function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(10, 15, 10);
  spotLight.angle = 0.1;
  spotLight.penumbra = 1;

  //  开启阴影 (castShadow)
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024; // 默认是 512
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.bias = -0.0001; // 防止阴
  scene.add(spotLight);
})();

(function animate() {
  const elapsedTime = clock.getElapsedTime();
  if (scene.children.length == 3) {
    scene.children[2].position.y = (1 + Math.sin(elapsedTime / 1.2)) / 15;

    const rad = THREE.MathUtils.degToRad(30);
    scene.children[2].rotation.set(rad + Math.cos(elapsedTime / 3) / 4, -rad + Math.cos(elapsedTime / 3) / 4, 0);
  }
  requestAnimationFrame(animate);
  if (CONFIG.CONTROLS) controls.update();
  renderer.render(scene, camera);
})();

function loadGltf(path) {
  loader.load(
    path,
    (gltf) => {
      const group = gltf.scene;
      // group.rotation.reorder('YXZ');
      group.rotation.set(THREE.MathUtils.degToRad(30), THREE.MathUtils.degToRad(-30), 0);

      console.log(gltf);
      handleGroup(group.children[0]);
      scene.add(group);
    },
    (event) => {
      console.log(event.loaded);
    },
    (err) => {
      console.log(err);
    },
  );
}

function handleGroup(group) {
  let count = 0;
  group.traverse((object, index) => {
    object.receiveShadow = true;
    object.castShadow = true;

    if (object.isMesh && count == 8) {
      console.log(object.material);
      //   object.material.color = new THREE.Color(0xf5d300);
    }
    count++;
  });
  window.group = group;

  // 3. 监听点击事件
  window.addEventListener('click', onMouseClick, false);
  window.addEventListener('mousemove', onMouseMove, false);
}
loadGltf('/shoe-draco.glb');

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  //  准备 Raycaster

  // A. 计算鼠标在屏幕上的归一化坐标 (-1 到 +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // B. 更新射线的方向
  raycaster.setFromCamera(mouse, camera);

  // C. 检测射线与 Group 的相交情况
  // 参数1: 要检测的物体 (group)
  // 参数2: true 表示递归检测 (一定要设为 true，否则只能检测 group 本身，而 group 本身没有几何体，是检测不到的)
  const intersects = raycaster.intersectObject(group, true);

  if (intersects.length > 0) {
    // D. 获取被点击的具体部分
    // intersects 数组是按距离排序的，[0] 是最近的那个（也就是你点的那个）
    const clickedObject = intersects[0].object;

    console.log('你点击了:', clickedObject.name, clickedObject.material.name);
    state.current = clickedObject.material.name;
    addLabel(clickedObject.material.name);
    // changeMaterialColor(clickedObject.name);
    window.nodeName = clickedObject.name;
    // window.materialName = clickedObject.name;
    // E. 改变点击物体的颜色（视觉反馈）
    // clickedObject.material.color.set(0x00ff00);
  } else {
    console.log('没点中 Group 里的任何东西');
  }
}

function onMouseMove(event) {
  //  准备 Raycaster

  // A. 计算鼠标在屏幕上的归一化坐标 (-1 到 +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(group, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${state.items[clickedObject.material.name]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${clickedObject.material.name}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`;
  } else {
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`;
  }
}

function changeMaterialColor(name, color) {
  group.traverse((object) => {
    if (object.isMesh && object.name == name) {
      console.log(object.material);
      object.material.color.setHex(color);
      //   = new THREE.Color(color || 0xe3a2b3);
    }
  });
}

function addLabel(text) {
  document.querySelector('.label')?.remove();
  const div = document.createElement('div');
  div.className = 'label';
  div.style.position = 'absolute';
  div.style.background = '#000';
  div.style.top = 0;
  div.innerText = text;
  document.body.prepend(div);
}
