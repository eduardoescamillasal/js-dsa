import { DoublyLinkedList } from "./DoubleLinkedList";

export class LeetCodeDoublyLinkedList extends DoublyLinkedList {
  isPalindrome() {
    let forward = this.head;
    let backward = this.tail;
    for (let i = 0; i < Math.floor(this.length / 2); i++) {
      if (forward.value !== backward.value) return false;
      forward = forward.next;
      backward = backward.prev;
    }
    return true;
  }
}
