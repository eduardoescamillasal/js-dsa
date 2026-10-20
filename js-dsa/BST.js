export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    // create newNode
    const newNode = new Node(value);
    // if root is null -- root is newNode
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    // let temp = this.root
    let temp = this.root;
    //while loop
    while (true) {
      // if newNode === temp ret undef
      if (newNode.value == temp.value) return undefined;
      // if < left else > right
      if (newNode.value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (temp.right == null) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
      // if null insert newNode else move to next
    }
  }

  contains(value) {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }
    return false;
  }
}
