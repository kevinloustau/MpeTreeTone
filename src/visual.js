const THREE = require('three');

// This is a shared state, it should leave outside of your functions
// although mutating stating like you are doing is not considered as the best practice,
// you should inject this state as parameter of your functions
let cube;
let renderer;
let camera;
let scene;
let clock; 

function Visual(){
  initScene();
  animate();
}


function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initLights();
  initRoom();

  clock = new THREE.Clock();
  clock.start();

  camera.position.z = 20;
}

function initLights() {
  var directionalLight = new THREE.DirectionalLight(0x222222);
  directionalLight.position.set(-1, 1, 1).normalize();
  scene.add( directionalLight );
  var spotLight = new THREE.SpotLight(0x222222);
  spotLight.position.set(0, 10, 0);
  scene.add(spotLight);
}

function initRoom() {
  var size = 10;
  var geometry = new THREE.PlaneBufferGeometry(size, size );
  var material = new THREE.MeshPhongMaterial({ color: 0x222222, specular: 0x222222, shininess: 75 });
  
  var room = new THREE.Object3D();
  room.position.y = size / 2 - size / 2;
  // top
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = size / 2;
  room.add(mesh);
  // bottom
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = - Math.PI / 2;
  mesh.position.y = - size / 2;
  room.add(mesh);
  // left
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = - size / 2;
  mesh.rotation.y = Math.PI / 2;
  room.add(mesh);
  // right
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = size / 2;
  mesh.rotation.y = - Math.PI / 2;
  room.add(mesh);
  // back
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = - size / 2;
  room.add(mesh);

  scene.add(room);
}

function animate() 
{
  requestAnimationFrame( animate );

  update();
	render();

}

function update(){
  
}

function render(){
  
  //camera.position.x += ( random(-15,15) - camera.position.x ) * .01;
	//camera.position.y += ( random(-15,15) - camera.position.y ) * .01;
  camera.lookAt( scene.position );
  
  //console.log(clock);
	renderer.render( scene, camera );
}


//MPE
function MPETimbreToAnimations(data){
  var timbre = data * 2;
  cube.scale.y = timbre;
  addParticle();
  //console.log(timbre);
}




// ------------- Utils -------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}


module.exports = {
  Visual,
  MPETimbreToAnimations
}