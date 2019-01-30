const { MPEToTone } = require('./src/sound');
const { setupScene, MPETimbreToAnimations } = require('./src/visual');
const mpeInstrument = require('mpe').default;


// ==============  MPE ============== //
const instrument = mpeInstrument();

navigator.requestMIDIAccess().then(access => {
  access.inputs.forEach(midiInput => {
    midiInput.addEventListener(
      'midimessage',
      (event) => instrument.processMidiMessage(event.data)
    );
  });
});

//Visual
setupScene();


//process data
function currentNote(data) {
  var note = 0;
  if (data.length > 0) { 
    note = data[0].noteNumber;
  }
  return note;
}

//process data
function currentTimbre(data) {
  var timbre = 0;
  if (data.length > 0) { 
    timbre = data[0].timbre;
  }
  return timbre;
}


function processAll(data){
  MPEToTone(currentNote(data));
  MPETimbreToAnimations(currentTimbre(data));
}

instrument.subscribe(processAll);
