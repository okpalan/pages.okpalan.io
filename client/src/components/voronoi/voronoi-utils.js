// Calculate distance between two points
 function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
export function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return { r: r, g: g, b: b };
}

export function findClosestSeedPoint(point) {
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
