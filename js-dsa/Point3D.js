/*🏗️ Structure & Constructor
Properties: Three public properties (x, y, and z) to represent coordinates in 3D space.

Constructor: A constructor that accepts three required arguments (x, y, z) and assigns them to the public properties.

📍 Static Helpers
Origin (getOrigin): A static method that accepts no arguments and returns a Point object representing the origin at (0, 0, 0).

📏 Distance Methods
Distance from Origin (getDistanceFromOrigin): A method that accepts no arguments and calculates/returns the Euclidean distance from the point to the origin.

Distance from Another Point (getDistanceFromPoint): A method that accepts another Point object and calculates/returns the Euclidean distance between the two points.
*/

export class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static getOrigin() {
    return new Point(0, 0, 0);
  }

  getDistanceFromOrigin() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  getDistanceFromPoint(point) {
    const displacement = new Point(
      point.x - this.x,
      point.y - this.y,
      point.z - this.z
    );
    return displacement.getDistanceFromOrigin();
  }
}
