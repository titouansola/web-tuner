import { NOTES } from "./constants";
import { frequencyToPercentage } from "./utils";

const sqrt2 = Math.sqrt(2);

export class CanvasManager {
  constructor() {
    this.canvas = document.querySelector("canvas#root");
    this.ctx = this.canvas.getContext("2d");
    this.update();
  }

  update() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.size = Math.min(this.canvas.width, this.canvas.height);
    this.topRadius = this.size / 2.5 - 20;
    this.bottomRadius = this.topRadius - 20;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawFrame(percentage) {
    this.clear();
    this.drawBaseChart();
    //
    if (percentage >= 0) {
      this.drawFrequency(percentage);
    }
  }

  drawAudioContextState(state) {
    const color = state === "running" ? "green" : "red";
    const size = Math.min(this.size / 10, 75);
    //
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX - size / sqrt2, this.centerY - size);
    this.ctx.lineTo(this.centerX - size / sqrt2, this.centerY + size);
    this.ctx.lineTo(this.centerX + size / sqrt2, this.centerY);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawFrequency(percentage) {
    const angle = (percentage * 2 * Math.PI) / 100;
    const x = this.centerX + this.topRadius * Math.cos(angle);
    const y = this.centerY + this.topRadius * Math.sin(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  }

  drawBaseChart() {
    // Top
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.topRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(200, 200, 200)";
    this.ctx.fill();
    // Bottom
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.bottomRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fill();
    // Notes
    for (let i = 0; i < NOTES.length; i++) {
      const angle = (frequencyToPercentage(NOTES[i].f) * 2 * Math.PI) / 100;
      this.drawNoteLabel(angle, NOTES[i].label);
      this.drawNoteDelimiter(angle);
    }
  }

  drawNoteLabel(angle, label) {
    const radius = this.topRadius + 20;
    const x = this.centerX + radius * Math.cos(angle) - 7;
    const y = this.centerY + radius * Math.sin(angle) + 7;
    this.ctx.font = "20px sans-serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(label, x, y);
  }

  drawNoteDelimiter(angle) {
    const x1 = this.centerX + this.topRadius * Math.cos(angle);
    const y1 = this.centerY + this.topRadius * Math.sin(angle);
    const x2 = this.centerX + this.bottomRadius * Math.cos(angle);
    const y2 = this.centerY + this.bottomRadius * Math.sin(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
