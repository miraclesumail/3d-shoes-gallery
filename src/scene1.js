/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-01-25 16:54:53
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-04 16:05:02
 * @FilePath: /start-1/src/scene1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE*
 */
import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Pane } from 'tweakpane';

const pane = new Pane();
const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#app'), antialias: true });
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const texture = textureLoader.load('/grass.jpg');
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
const light = new THREE.AmbientLight(0x0000ff, 0.6);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 3);
// pointLight.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);

const geometry = new THREE.BoxGeometry(1, 1, 1, 5);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, fog: false });
const material = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.5 });
const cube = new THREE.Mesh(geometry, material);

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
// const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
const material1 = new THREE.MeshBasicMaterial({ map: texture });
material1.color = new THREE.Color('pink');
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const texture1 = textureLoader.load('/output.png');
texture1.magFilter = THREE.NearestFilter;
texture1.minFilter = THREE.NearestFilter;
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.repeat.set(2, 2);
texture1.offset.x = 0.9;
const planeMaterial = new THREE.MeshBasicMaterial({ color: 'transparent', side: THREE.DoubleSide, map: texture1 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.x = -2;
plane.rotation.x = THREE.MathUtils.degToRad(45);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
const torusMaterial = new THREE.MeshPhongMaterial({ shininess: 90 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.y = 2;
pane.addBinding(torusMaterial, 'shininess', { min: 0, max: 100, step: 1 });
scene.add(torus);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  color: 'pink',
  wireframe: false,
});

const sphere = new THREE.Mesh(sphereGeometry, material1);
sphere.position.y = -2;
pane.addBinding(sphereMaterial, 'metalness', { min: 0, max: 1, step: 0.01 });
pane.addBinding(sphereMaterial, 'roughness', { min: 0, max: 1, step: 0.01 });
scene.add(sphere);

// const meshStand

const fog = new THREE.Fog(0xffffff, 1, 12);
// scene.fog = fog;

scene.add(cube, cube1, plane);
// scene.background = new THREE.Color(0xffffff);
camera.position.set(0, 0, 5);

function createBoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
  return new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
}

function updateCameraAspect() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

function update() {
  scene.children.forEach((child, index) => {
    if (child instanceof THREE.Mesh) {
      console.log(index);
      if (index % 2 === 0) {
        child.rotation.x += 0.000001;
        //   child.rotation.y += 0.01;
      } else {
        child.rotation.x += 0.001;
        child.rotation.y += 0.001;
      }
    }
  });
  requestAnimationFrame(update);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  updateCameraAspect();
  control.update();
  renderer.render(scene, camera);
}

update();
