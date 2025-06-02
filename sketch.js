let song;
let fft;
let amp;

function preload() {
  song = loadSound('duck-toy-sound.mp3'); // Replace with your audio file path
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  fft = new p5.FFT(0.8, 64);
  amp = new p5.Amplitude();
  fft.setInput(song);
  amp.setInput(song);

  song.loop(); // Start playing the song in loop
}

function draw() {
  background(0, 0, 20);

  let spectrum = fft.analyze();
  let level = amp.getLevel();

  // Draw frequency bars
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height * 0.8);
    fill(map(i, 0, spectrum.length, 0, 360), 80, 100);
    rect(x, height - h, width / spectrum.length, h);
  }

  // Draw pulsing circle based on amplitude
  let circleSize = map(level, 0, 0.3, 50, 300);
  fill(200, 80, 80, 150);
  ellipse(width / 2, height / 2, circleSize);

  // Draw waveform
  let waveform = fft.waveform();
  noFill();
  stroke(180, 80, 100);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height / 2 + 50, height / 2 - 50);
    vertex(x, y);
  }
  endShape();
}
