const sound = require('./src/sound');
const visual = require('./src/visual');
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


