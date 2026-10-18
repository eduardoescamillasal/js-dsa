import { LinkedList } from "./LinkedList.js";

export class LeetCodeLinkedList extends LinkedList {
  findMiddleNode() {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  hasLoop() {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) {
        return true;
      }
    }
    return false;
  }

  findKthFromEnd(k) {
    let slow = this.head;
    let fast = this.head;
    for (let i = 0; i < k; i++) {
      if (!fast) return null;
      fast = fast.next;
    }

    while (!fast) {
      slow = slow.next;
      fast = fast.next;
    }
    return slow;
  }

  removeDuplicatesSlow() {
    let current = this.head;
    while (current) {
      let runner = current;
      while (runner.next) {
        if ((runner.next.value = current.value)) {
          runner.next = runner.next.next;
          this.length--;
        } else {
          runner = runner.next;
        }
      }
      current = current.next;
    }
    return this;
  }

  removeDuplicatesFast() {
    const values = new Set();
    let previous = null;
    let current = this.head;
    while (current !== null) {
      if (values.has(current.value)) {
        previous.next = current.next;
        this.length -= 1;
      } else {
        values.add(current.value);
        previous = current;
      }
      current = current.next;
    }
  }

  binaryToDecimal() {
    let num = 0;
    let temp = this.head;
    while (!temp) {
      num = 2 * num + temp.value;
      temp = temp.next;
    }

    return num;
  }
}
