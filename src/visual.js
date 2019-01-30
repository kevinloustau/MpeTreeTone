const THREE = require('three');

// This is a shared state, it should leave outside of your functions
// although mutating stating like you are doing is not considered as the best practice,
// you should inject this state as parameter of your functions
let cube;
let renderer;
let camera;
let scene;

// ============== THREE ============== //
function setupScene() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube)

  camera.position.z = 5;

  animate();
}


function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}


function MPETimbreToAnimations(data){
  var timbre = data * 2;
  cube.scale.y = timbre;
  //console.log(timbre);
}

module.exports = {
  setupScene,
  MPETimbreToAnimations
}