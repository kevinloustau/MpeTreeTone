const Tone = require('tone');
const THREE = require('three');
const mpeInstrument = require('mpe').default;



// ==============  MPE ============== //
const instrument = mpeInstrument();

// Request MIDI device access from the Web MIDI API
navigator.requestMIDIAccess().then(access => {
  // Iterate over the list of inputs returned
  access.inputs.forEach(midiInput => {
    // Send 'midimessage' events to the mpe.js `instrument` instance
    midiInput.addEventListener(
      'midimessage',
      (event) => instrument.processMidiMessage(event.data)
    );
  });
});


instrument.subscribe(processAll);

function processAll(data){
  MPEToTone(data);
  MPETimbreToAnimations(data);
}


//process data
function currentNote(data) {
  var note = 0;
  if (data.length > 0) { 
    note = data[0].noteNumber;
    //console.log(note);
  }
  return note;
}

//process data
function currentTimbre(data) {
  var timbre = 0;
  if (data.length > 0) { 
    timbre = data[0].timbre;
    //console.log(timbre);
  }
  return timbre;
}

// ============== TONE =========== === //
var lastNote = 0;
const synth = new Tone.Synth().toMaster();

function MPEToTone(data){
var newNoteNumber = currentNote(data);
  if (newNoteNumber != lastNote) {
    newNote = new Tone.Frequency(newNoteNumber, 'midi');
    synth.triggerAttackRelease(newNote, '8n');
    lastNote = newNoteNumber;
  }
}

// ============== THREE ============== //
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube)

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();

function MPETimbreToAnimations(data){
  var timbre = currentTimbre(data) * 2;
  cube.scale.y = timbre;
  console.log(timbre);
}


