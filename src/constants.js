export const F_PITCH_THRESHOLD = 130; // C3 - https://www.researchgate.net/figure/Frequencies-of-musical-notes_tbl1_324760170
//
export const NOTES = [
  { label: "C", f: 65 },
  { label: "C#", f: 69 },
  { label: "D", f: 73 },
  { label: "D#", f: 77 },
  { label: "E", f: 82 },
  { label: "F", f: 87 },
  { label: "F#", f: 92 },
  { label: "G", f: 98 },
  { label: "G#", f: 104 },
  { label: "A", f: 110 },
  { label: "A#", f: 116 },
  { label: "B", f: 123 },
];
//
const OFFSET = 2;
export const START_F = NOTES[0].f - OFFSET;
export const END_F = NOTES[NOTES.length - 1].f + OFFSET;
export const RANGE_F = END_F - START_F;
// Colors
