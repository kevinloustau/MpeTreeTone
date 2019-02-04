const { MPEToTone } = require('./src/sound');
const { Visual, MPETimbreToAnimations } = require('./src/visual');
const mpeInstrument = require('mpe').default;


// ==============  MPE ============== //
const instrument = mpeInstrument();

Visual();

navigator.requestMIDIAccess().then(access => {
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
  //sound.MPEToTone(currentNote(data));
  //visual.MPETimbreToAnimations(currentTimbre(data));
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


