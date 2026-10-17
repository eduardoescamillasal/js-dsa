import { LeetCodeLinkedList } from "./LeetCodeLinkedList.js";

const myList = new LeetCodeLinkedList(1);
myList.push(2);
myList.push(3);
console.log("Middle Node Value:", myList.findMiddleNode().value);
