const Tone = require('tone');

// ============== TONE =========== === //
var lastNote = 0;
const synth = new Tone.Synth().toMaster();

function MPEToTone(data){
  var newNoteNumber = data;
  if (newNoteNumber !== lastNote) {
    newNote = new Tone.Frequency(newNoteNumber, 'midi');
    synth.triggerAttackRelease(newNote, '8n');
    lastNote = newNoteNumber;
  }
}

module.exports = {
  MPEToTone
}