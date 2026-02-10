/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-03 11:41:07
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-07 21:06:47
 * @FilePath: /start-1/src/example/ring.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const positions = [
  { x: 0, y: 0, z: 0 },
  { x: 30, y: 0, z: 5, color: 0xef4444 },
  { x: Math.sin(Math.PI / 4) * 30, y: Math.sin(Math.PI / 4) * 30, z: 2.5, color: 0xf97316 },
  { x: 0, y: 30, z: 0, color: 0xeab308 },
  { x: -Math.sin(Math.PI / 4) * 30, y: Math.sin(Math.PI / 4) * 30, z: -2.5, color: 0x22c55e },

  { x: -30, y: 0, z: -5, color: 0x3b82f6 },
  { x: -Math.sin(Math.PI / 4) * 30, y: -Math.sin(Math.PI / 4) * 30, z: 2.5, color: 0x6366f1 },

  { x: 0, y: -30, z: 0, color: 0xa855f7 },
  { x: Math.sin(Math.PI / 4) * 30, y: -Math.sin(Math.PI / 4) * 30, z: -2.5 },
];

const objects = {};

function getRenderer() {
  if (objects.renderer) {
    return objects.renderer;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  return (objects.renderer = renderer);
}

function getScene() {
  return objects.scene || (objects.scene = new THREE.Scene());
}

function getControls() {
  if (objects.controls) {
    return objects.controls;
  }
  const controls = new OrbitControls(getCamera(), getRenderer().domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  return (objects.controls = controls);
}

function getCamera() {
  if (objects.camera) return objects.camera;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;
  return (objects.camera = camera);
}

async function initStage(animate = false) {
  objects.clock = new THREE.Clock();
  getRenderer();
  getCamera();
  getControls();

  console.log(gsap);
  return new Promise((resolve) => {
    const scene = getScene();

    for (let i = 0; i < positions.length; i++) {
      const { x, y, z, color } = positions[i];

      const geometry = new THREE.TorusGeometry(5, 0.2, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: color || 0x049ef4 });
      const mesh = new THREE.Mesh(geometry, material);
      const vec = new THREE.Vector3(x, y, 0);
      mesh.position.set(...vec);
      scene.add(mesh);
    }

    if (animate) rotateRing();

    resolve(true);
  });
}

function rotateRing() {
  const scene = getScene();
  const meshes = [];
  scene.traverse((object) => {
    if (object.isMesh) meshes.push(object);
  });

  const rotations = meshes.map((mesh) => mesh.rotation);

  gsap.to(rotations[0], {
    y: `+=${Math.PI * 2}`,
    x: `-=${Math.PI * 2}`,
    duration: 0.2,
    repeat: -1,
    ease: 'none',
  });

  gsap.timeline({ repeat: -1, repeatDelay: 0.2 }).to(rotations.slice(1), {
    y: `+=${Math.PI * 2}`,
    x: `-=${Math.PI * 2}`,
    duration: (index) => 1,
    stagger: {
      each: 0.5,
    },
    delay: 0.2,
  });

  //   gsap.timeline({ repeat: -1, repeatDelay: 0, reversed: true }).to(getCamera().position, {
  //     z: 100,
  //     duration: 1,
  //   });
  gsap.to(getCamera().position, {
    keyframes: {
      '0%': { z: 80 },
      '25%': { z: 100 },
      '50%': { z: 80 },
      '75%': { z: 60 },
      '100%': { z: 80 },
    },
    duration: 1,
    repeat: -1,
    ease: 'none',
  });
}

// 调整相机宽高比
function updateCameraAspect() {
  const camera = getCamera();
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

function animate() {
  const elapsedTime = objects.clock.getElapsedTime();
  getCamera().rotation.z += 0.05;

  requestAnimationFrame(animate);
  const renderer = getRenderer();
  //   getControls().update();
  renderer.render(getScene(), getCamera());
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  getRenderer().setSize(window.innerWidth, window.innerHeight);
  updateCameraAspect();
});

initStage(true).then(animate);
