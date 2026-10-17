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
}
