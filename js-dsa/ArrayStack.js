export class ArrayStack {
  constructor() {
    this.stackList = [];
  }

  push(value) {
    this.stackList.push(value);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.stackList.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.stackList[this.stackList.length - 1];
    }
  }

  size() {
    return this.stackList.length;
  }

  isEmpty() {
    return this.stackList.length === 0;
  }

  ///
}

export function reverseString(str) {
  const stack = new ArrayStack();
  let res = "";
  for (let c of str) {
    stack.push(c);
  }

  while (!stack.isEmpty) {
    res += stack.pop();
  }

  return res;
}
