/* 🏗️ Structure & Constructor
Properties: Three public properties (i, j, and k) to represent coordinates in 3D space.

Constructor: A constructor that accepts three required arguments (i, j, k) and assigns them to the public properties.

📐 Basic Methods & Static Helpers
Magnitude (getMagnitude): A method that calculates and returns the length (magnitude) of the vector.

Static Unit Vectors (getI, getJ, getK): Three static methods that return standard unit vectors:

i
^
 =(1,0,0)

j
^
​
 =(0,1,0)

k
^
 =(0,0,1)

➕ Vector Operations
Addition (add): A method that takes another Vector and returns a new Vector representing their sum.

Scalar Multiplication (multiplyByScalar): A method that takes a number and returns a new Vector scaled by that value.

Dot Product (dot): A method that takes another Vector and returns their scalar dot product.

Cross Product (cross): A method that takes another Vector and returns a new Vector representing the cross product (
a×b).

🔍 Advanced & Validation Methods
Parallel Check (isParallelTo): A method that returns a boolean indicating whether two vectors are parallel or antiparallel. Edge case: Return false if either (or both) is a zero vector, and account for floating-point tolerance.

Perpendicular Check (isPerpendicularTo): A method that returns a boolean indicating whether two vectors are perpendicular. Edge case: Return false if either is a zero vector, and account for floating-point tolerance.

Normalization (normalize): A method that returns a new normalized version of the vector (magnitude of 1).

Is Normalized Check (isNormalized): A method that returns a boolean stating whether the vector already has a unit length (accounting for floating-point errors).
*/
class Vector {
  constructor(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
  }

  getMagnitude() {
    return Math.sqrt(this.dot(this));
  }

  static getI() {
    return new Vector(1, 0, 0);
  }

  static getJ() {
    return new Vector(0, 1, 0);
  }

  static getK() {
    return new Vector(0, 0, 1);
  }

  add(v) {
    let i = this.i;
    let j = this.j;
    let k = this.k;

    return new Vector(i + v.i, j + v.j, k + v.k);
  }

  multiplyByScalar(scalar) {
    return new Vector(scalar * this.i, scalar * this.j, scalar * this.k);
  }

  dot(v) {
    return v.i * this.i + v.j * this.j + v.k * this.k;
  }

  cross(v) {
    let x = this.j * v.k - this.k * v.j;
    let y = this.k * v.i - this.i * v.k;
    let z = this.i * v.j - this.j * v.i;
    return new Vector(x, y, z);
  }

  isParallelTo(v) {
    if (this.getMagnitude() < 1e-9 || v.getMagnitude() < 1e-9) return false;
    return Math.abs(this.cross(v).getMagnitude()) < 10e-6;
  }

  isPerpendicularTo(v) {
    if (this.getMagnitude() < 1e-9 || v.getMagnitude() < 1e-9) return false;
    return Math.abs(this.dot(v)) < 1e-6;
  }

  normalize() {
    let length = this.getMagnitude();
    let x = this.i / length;
    let y = this.j / length;
    let z = this.k / length;
    return new Vector(x, y, z);
  }

  isNormalized() {
    return Math.abs(this.getMagnitude() - 1) < 1e-6;
  }
}
