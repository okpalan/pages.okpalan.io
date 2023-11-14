import "./voronoi.css";
var canvas = document.getElementById("voronoiCanvas");
var ctx = canvas.getContext("2d");

// Generate random points as seeds
var numPoints = 20;
var colors = [
  [34, 43, 73, 1],
  [213, 34, 21, 1],
  [234, 246, 255, 1], // alice blue
  [35, 37, 40, 1]     // rasin black
];


var points = [];
for (var i = 0; i < numPoints; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  });
}

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
};

function assignColors() {
  var imageData = ctx.createImageData(canvas.width, canvas.height);
  var data = imageData.data;

  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      var closestPointIndex = findClosestSeedPoint({ x: x, y: y });

      // Select color based on the index of the closest point
      var color = colors[closestPointIndex % colors.length];
      var pixelIndex = (y * canvas.width + x) * 4;
      data[pixelIndex] = color[0]; // Red channel
      data[pixelIndex + 1] = color[1]; // Green channel
      data[pixelIndex + 2] = color[2]; // Blue channel
      data[pixelIndex + 3] = color[3] * 255; // Alpha channel (scaled to 0-255)
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Draw the Voronoi diagram
function drawVoronoi() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  assignColors();
}

function updateVoronoi(e) {
  // Get the mouse position
  var mouseX = canvas.cliente.clientX;
  var mouseY = e.clientY;

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
}

// Redraw the diagram when the window is resized
window.addEventListener("resize", function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawVoronoi();
});

// Add a mousemove event listener to the canvas
canvas.addEventListener('mousemove', function (e) {
  // Update the Voronoi diagram
  updateVoronoi(e);
});

drawVoronoi();
