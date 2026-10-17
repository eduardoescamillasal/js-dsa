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
}
