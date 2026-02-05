/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-01-27 19:51:21
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-03 14:45:10
 * @FilePath: /start-1/src/example/eg2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PerspectiveCamera, Scene, WebGLRenderer, AmbientLight, Color, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(75, aspect, 0.1, 1000);
const renderer = new WebGLRenderer({ alpha: true, antialias: true });
const loader = new GLTFLoader();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 20;
//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
//Keep the 3D object on a global variable so we can access it later
let object;

let objToRender = 'dino';
scene.background = new Color(0x000);
loader.load(
  `/models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('An error happened', error);
  },
);

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

function updateCameraAspect() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}
//Add lights to the scene, so we can actually see the 3D model
const topLight = new DirectionalLight('yellow', 1); // (color, intensity)
topLight.position.set(0, 0, 10); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new AmbientLight(0x333333, objToRender === 'dino' ? 5 : 1);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === 'dino') {
    object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
  }
  updateCameraAspect();
  renderer.render(scene, camera);
}

animate();
