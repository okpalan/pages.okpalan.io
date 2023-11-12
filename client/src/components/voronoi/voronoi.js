import "./voronoi.css";

// Get the canvas element
const canvas = document.getElementById("voronoiCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// Dynamically import the voronoi worker module
import(new URL('./voronoi-worker.js', import.meta.url)).then(() => {

  const voronoiWorker = new Worker(import.meta.url);
  // Redraw the diagram when the window is resized
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawVoronoi();
  });

  window.addEventListener("DOMContentLoaded", function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawVoronoi();
  });

  // Add a mousemove event listener to the canvas
  canvas.addEventListener('mousemove', (e) => updateVoronoi(e), false);

  function drawVoronoi(imageData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  }

  // Define an array of colors
  const colors = [
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a",
    "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94",
    "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d",
  ];

  function updateVoronoi(e) {
    const { left, top } = canvas.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Send data to the Web Worker for 
    // calculation
    voronoiWorker.postMessage({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      colors: colors,
      mouseX: mouseX,
      mouseY: mouseY,
    });
  }

  voronoiWorker.addEventListener('message', function (event) {
    console.log('Received data from Web Worker:', event.data);
    drawVoronoi(event.data);
  });

});
