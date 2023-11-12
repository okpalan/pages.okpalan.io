
// Import necessary functions
importScripts(new URL('./voronoi-utils.js', import.meta.url));
// Listen for messages from the main thread
self.addEventListener('message', function (e) {
  // Extract data from the message
  const { canvasWidth, canvasHeight, colors } = e.data;

  // Perform Voronoi calculations
  const imageData = assignColors(canvasWidth, canvasHeight, colors);
  
  // Send the result back to the main thread
  self.postMessage(imageData, [imageData.data.buffer]);
});

// Function to assign colors to pixels in the Voronoi diagram
function assignColors(canvasWidth, canvasHeight, colors) {
  const imageData = new ImageData(canvasWidth, canvasHeight);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      const closestPointIndex = findClosestSeedPoint({ x, y });

      const colorIndex = closestPointIndex % colors.length;
      const color = colors[colorIndex];
      const rgb = hexToRgb(color);

      const pixelIndex = (y * canvasWidth + x) * 4;
      imageData.data[pixelIndex] = rgb.r;
      imageData.data[pixelIndex + 1] = rgb.g;
      imageData.data[pixelIndex + 2] = rgb.b;
      imageData.data[pixelIndex + 3] = 255;
    }
  }

  return imageData;
}
export  default {assignColors}
