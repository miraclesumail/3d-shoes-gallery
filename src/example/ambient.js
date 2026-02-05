/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-01-28 15:01:33
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-04 15:59:56
 * @FilePath: /start-1/src/example/ambient.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Pane } from 'tweakpane';
import '../style.css';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x431109);

new THREE.PMREMGenerator();
// AmbientLight (环境光) 充斥在整个空间的光，没有方向，均匀地照亮所有物体。
const ambientLight = new THREE.AmbientLight(0x049ef4, 1);
// scene.add(ambientLight);

console.log(ambientLight.color.getHex());

// fov = 75 near = 0.1 far = 1000
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 从一个点向四面八方发光，光强会随着距离衰减（距离越远越暗）
const pointLight = new THREE.PointLight('blue', 1, 100, 0.1);
pointLight.position.set(0, 0.5, 80);
// scene.add(pointLight);

// 控制面板 调节光的强度和位置
const pane = new Pane();
pane.addBinding(pointLight, 'intensity', { min: 0, max: 12, step: 0.1 });
pane.addBinding(pointLight.position, 'z', { min: 0, max: 150, step: 0.1 });

// 创建一个立方体网格来观察光照效果
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// THREE.BoxGeometry.fromJSON()

const obj = {
  metadata: {
    version: 4.7,
    type: 'BufferGeometry',
    generator: 'BufferGeometry.toJSON',
  },
  uuid: '6a72ef94-15ec-46ad-9ca4-cf22aa2b102e',
  type: 'BoxGeometry',
  width: 2,
  height: 2,
  depth: 1,
};

const box1 = THREE.BoxGeometry.fromJSON(obj);

// 使用 Lambert 材质，它会受到光照影响
const boxMaterial1 = new THREE.MeshLambertMaterial({
  color: 0x049ef4,
  //   emissive: 0xf5d300, // 设置成红色
  visible: true,
  combine: THREE.MultiplyOperation,
  side: THREE.FrontSide,
  opacity: 1,
  reflectivity: 0.8,
  refractionRatio: 0.8,
  emissiveIntensity: 1, // 发光强度
});

const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x049ef4 });

// 创建mesh并添加到场景中
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const boxMesh1 = new THREE.Mesh(box1, boxMaterial);
boxMesh1.position.set(3, 0, 1);
// scene.add(boxMesh1);

// 渲染器 以#app作为画布
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#app'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
// 控制旋转操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 调整相机宽高比
function updateCameraAspect() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// 监听窗口大小变化
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateCameraAspect();
});
