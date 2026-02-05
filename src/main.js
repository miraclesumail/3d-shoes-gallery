import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const group = new THREE.Group();
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 3;
// mesh.rotation.y = THREE.MathUtils.degToRad(45);

const geometry1 = new THREE.BoxGeometry(1, 1, 1, 3);
const material1 = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true,  });
const mesh1 = new THREE.Mesh(geometry1, material1);
const vector = new THREE.Vector3(0, 3, 0);
const a = new THREE.Euler(
  THREE.MathUtils.degToRad(0),
  THREE.MathUtils.degToRad(45),
  THREE.MathUtils.degToRad(0),
  'XYZ',
);
vector.applyEuler(a);

mesh1.position.copy(vector);
// mesh1.rotation.x = THREE.MathUtils.degToRad(10);
// mesh1.rotation.y = THREE.MathUtils.degToRad(45);
// mesh1.scale.set(1, 2, 1);

const geometr3 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material3 = new THREE.MeshBasicMaterial({ color: 'blue' });
const mesh3 = new THREE.Mesh(geometr3, material3);
mesh3.position.x = -5;
group.scale.setScalar(0.8);

const geometry4 = new THREE.BufferGeometry();
const geometry5 = new THREE.BufferGeometry();
const geometry6 = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  -1.0,  -1.0, // v2
	 1.0,  -1.0,  -1.0, // v2
   -1.0,  -1.0,  -1.0, // v6
	-1.0, -1.0,  1.0, // v0
	//  -1.0,  -1.0,  -1.0, // v3
	// -1.0,  1.0,  1.0, // v4
	// -1.0, -1.0,  1.0, // v5

] );

const vertices1 = new Float32Array( [
	-1.0, 1.0,  1.0, // v0
	 1.0, 1.0,  1.0, // v1
	 1.0,  1.0,  -1.0, // v2
	 1.0,  1.0,  -1.0, // v2
   -1.0,  1.0,  -1.0, // v6
	-1.0, 1.0,  1.0, // v0
	//  -1.0,  -1.0,  -1.0, // v3
	// -1.0,  1.0,  1.0, // v4
	// -1.0, -1.0,  1.0, // v5
] );

const vertices2 = new Float32Array( [
	1.0, 1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  -1.0,  -1.0, // v2
	 1.0,  -1.0,  -1.0, // v2
	 1.0,  1.0,  -1.0, // v2
   	1.0, 1.0,  1.0, // v0

	//  1.0,  1.0,  -1.0, // v2
  //  -1.0,  1.0,  -1.0, // v6
	// -1.0, 1.0,  1.0, // v0
	//  -1.0,  -1.0,  -1.0, // v3
	// -1.0,  1.0,  1.0, // v4
	// -1.0, -1.0,  1.0, // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry4.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material4 = new THREE.MeshBasicMaterial( { color: 'orange' } );
const mesh4 = new THREE.Mesh( geometry4, material4 );

geometry5.setAttribute( 'position', new THREE.BufferAttribute( vertices1, 3 ) );
const material5 = new THREE.MeshBasicMaterial( { color: 'purple' } );
const mesh5 = new THREE.Mesh( geometry5, material5 );

geometry6.setAttribute( 'position', new THREE.BufferAttribute( vertices2, 3 ) );
const material6 = new THREE.MeshBasicMaterial( { color: 'pink' } );
const mesh6 = new THREE.Mesh( geometry6, material6 );
group.add(mesh, mesh1, mesh3, mesh4, mesh5, mesh6);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

console.log(mesh1);
console.log(scene);
console.log(THREE.MathUtils.generateUUID());

camera.position.z = 10;
console.log(mesh1.position.distanceTo(camera.position), 'distance to camera');

// camera.position.x = 58;
scene.add(group);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#app'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

moveX(mesh3, [-6, -4]);

let dis = 0;
let direction = 1;

function animate() {
  requestAnimationFrame(animate);
  dis += 0.05 * direction;
  if (dis > 3 || dis < -3) direction *= -1;
  mesh.position.y = dis;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.enableZoom = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5.0;

function moveX(mesh, distance = [1, 1], speed = 0.01) {
  console.log(mesh3.position.x, 'mesh x is ');
  let dis = mesh.position.x;
  let direction = 1;

  function animateX() {
    requestAnimationFrame(animateX);
    dis += speed * direction;
    if (dis > distance[1] || dis < distance[0]) direction *= -1;
    mesh.position.x = dis;
    renderer.render(scene, camera);
  }
  animateX();
}

function update() {
  requestAnimationFrame(update);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  controls.update();
  renderer.render(scene, camera);
}
update();
