import { F_PITCH_THRESHOLD } from "./constants";
import { frequencyToPercentage } from "./utils";

export class AudioManager {
  constructor() {
    this.audioContext = new AudioContext();
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = Math.pow(2, 15); // Maximum available
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.data = new Float32Array(this.bufferLength);
    this.distribution = this.audioContext.sampleRate / (2 * this.bufferLength);
  }

  async init() {
    const inputStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.source = this.audioContext.createMediaStreamSource(inputStream);
    this.source.connect(this.analyzer);
  }

  readFrequencyPercentage() {
    this.analyzer.getFloatFrequencyData(this.data);
    let max = Infinity;
    let maxIndex = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      const value = -this.data[i];
      if (value < max) {
        max = value;
        maxIndex = i;
      }
    }
    if (max < 60) {
      let f = maxIndex * this.distribution;
      while (f > F_PITCH_THRESHOLD) f /= 2;
      return frequencyToPercentage(f);
    }
    return -1;
  }
}
