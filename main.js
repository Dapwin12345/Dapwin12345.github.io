import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// setting up scene
const scene = new THREE.Scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 

const renderer = new THREE.WebGLRenderer({
  
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);


// creating an object
const geometry = new THREE.TorusGeometry( 8,1,11,100);
const material = new THREE.MeshStandardMaterial ( {color: 0x71E091} );
const torus = new THREE.Mesh ( geometry, material);
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set (5,5,5)

const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper( 200, 50 );
scene.add(lightHelper);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

// making stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

//bg
const spaceTexture = new THREE.TextureLoader().load('LIGHTS.jpg');
scene.background = spaceTexture;

const Stevie = new THREE.TextureLoader().load('steveUNO.jpg');

const stevie1 = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: Stevie} )
);

scene.add(stevie1);

const guy1 = new THREE.TextureLoader().load('steveDOS.png');
const normalTexture = new THREE.TextureLoader().load('mapsan.jpg');

const guy = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: guy1,
    normalMap: normalTexture
  } )

);

scene.add(guy);

guy.position.z = 30;
guy.position.setX(-10);

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  
  guy.rotation.x += 0.05;
  guy.rotation.y += 0.075;
  guy.rotation.z += 0.05;

  stevie1.rotation.y += 0.01;
  stevie1.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;


}

document.body.onscroll = moveCamera


// To not have to keep calling a render method we'll just set a loop to call it automatically renderer.render( scene, camera );
// this is like a game loop 

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );

}

animate()