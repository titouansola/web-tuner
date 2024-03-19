import { AudioManager } from "./audio";
import { CanvasManager } from "./canvas";

import "./style.css";

const audioManager = new AudioManager();
const canvasManager = new CanvasManager();

async function main() {
  await audioManager.init();
  //
  function tick() {
    requestAnimationFrame(tick);
    const pitch = audioManager.readFrequencyPercentage();
    canvasManager.update();
    canvasManager.drawFrame(pitch);
    canvasManager.drawAudioContextState(audioManager.audioContext.state);
  }
  tick();
}

main();

canvasManager.canvas.addEventListener("click", () => {
  if (audioManager.audioContext.state === "running") {
    audioManager.audioContext.suspend();
  } else {
    audioManager.audioContext.resume();
  }
});
