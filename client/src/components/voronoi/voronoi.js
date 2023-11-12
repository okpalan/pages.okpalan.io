import "./voronoi.css"
// Get the canvas element
var canvas = document.getElementById("voronoiCanvas");
var ctx = canvas.getContext("2d");

// Hex to RGB conversion function
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r: r, g: g, b: b };
}

// Generate random points as seeds
var numPoints = 8;
var points = [];
for (var i = 0; i < numPoints; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  });
}

// Define a palette of colors
var colors = [
  "#EDE0D4", "#E6CCB2", "#DDB892", "#B08968",
];

// Calculate distance between two points
function distance(p1, p2) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find the closest seed point to a given point
function findClosestSeedPoint(point) {
  var minDistance = Number.MAX_VALUE;
  var closestPointIndex = -1;
  for (var i = 0; i < numPoints; i++) {
    var d = distance(point, points[i]);
    if (d < minDistance) {
      minDistance = d;
      closestPointIndex = i;
    }
  }
  return closestPointIndex;
}

// Assign colors based on proximity
function assignColors() {
  var imageData = ctx.createImageData(canvas.width, canvas.height);
  var data = imageData.data;

  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      var closestPointIndex = findClosestSeedPoint({ x: x, y: y });

      // Set color based on the index of the closest point
      var colorIndex = closestPointIndex % colors.length;
      var color = colors[colorIndex];
      var rgb = hexToRgb(color);

      var pixelIndex = (y * canvas.width + x) * 4;
      data[pixelIndex] = rgb.r; // Red channel
      data[pixelIndex + 1] = rgb.g; // Green channel
      data[pixelIndex + 2] = rgb.b; // Blue channel
      data[pixelIndex + 3] = 255; // Alpha channel
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Draw the Voronoi diagram
function drawVoronoi() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  assignColors();
}

// Update Voronoi diagram on mousemove
const updateVoronoi = (e) => {
  // Get the mouse position
  var { left, top, width, height } = canvas.getBoundingClientRect();
  var mouseX =  e.clientX, mouseY = e.clientY -top;

  // Find the closest seed point to the mouse position
  var closestPointIndex = findClosestSeedPoint({ x: mouseX, y: mouseY });

  // Store the original position of the closest seed point
  var originalPosition = points[closestPointIndex];

  // Move the closest seed point slightly towards the mouse position
  points[closestPointIndex] = {
    x: (originalPosition.x + mouseX) / 2,
    y: (originalPosition.y + mouseY) / 2,
  };

  // Redraw the Voronoi diagram
  drawVoronoi();
};

// Redraw the diagram when the window is resized
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawVoronoi();
});

// Add a mousemove event listener to the canvas
canvas.addEventListener('mousemove', (e) => updateVoronoi(e), false);

// Initial drawing
drawVoronoi();

