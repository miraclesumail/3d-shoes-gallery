/*
 * @Author: sumail sumail@xyzzdev.com
 * @Date: 2026-02-02 15:19:44
 * @LastEditors: sumail sumail@xyzzdev.com
 * @LastEditTime: 2026-02-04 16:02:05
 * @FilePath: /start-1/src/example/a1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const vector = new THREE.Vector3(1, 1, 1);

console.log(vector);

const vector1 = new THREE.Vector3(1, 1, 1);

console.log(vector.add(vector1));
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
const scene = new THREE.Scene();
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 10, 100);
camera.position.z = 35;
const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32).toNonIndexed();

const mesh = new THREE.Mesh(geometry);
mesh.material = new THREE.MeshLambertMaterial({ color: 0x049ef4 });
scene.add(mesh);
function render() {
  requestAnimationFrame(render);

  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;

  renderer.render(scene, camera);
}

render();
